from fastapi import APIRouter, HTTPException

from app.utils.file_utils import get_processed_file

from app.services.data_engine.profiler import load_dataset

from app.services.ml_engine.preprocessing import (
    prepare_ml_data,
    prepare_prediction_features,
)

from app.services.ml_engine.trainer import (
    train_model,
    train_multiple_models,
    get_available_models,
)

from app.services.ml_engine.evaluator import (
    evaluate_model,
    evaluate_multiple_models,
    find_best_model,
)

from app.services.ml_engine.predictor import (
    make_prediction,
    load_saved_model,
    get_prediction_probabilities,
    save_model,
)

from app.schemas.ml import PredictionRequest


router = APIRouter()


# ============================================================
# GET AVAILABLE MODELS
# ============================================================

@router.get("/models")
def available_models():
    """
    Return the ML models supported by DataPilot.
    """

    return {
        "models": get_available_models()
    }


# ============================================================
# TRAIN MODEL
# ============================================================

@router.post("/{dataset_id}/train")
def train_dataset_model(
    dataset_id: str,
    target_column: str,
    model_name: str = "logistic_regression",
):
    """
    Prepare, train, and evaluate an ML model.
    """

    file_path = get_processed_file(dataset_id)

    if file_path is None:
        raise HTTPException(
            status_code=404,
            detail="Processed dataset not found. Process the dataset first.",
        )

    try:

        # ----------------------------------------------------
        # Load dataset
        # ----------------------------------------------------

        df = load_dataset(str(file_path))

        # ----------------------------------------------------
        # Prepare ML data
        # ----------------------------------------------------

        (
            X_train,
            X_test,
            y_train,
            y_test,
            summary,
        ) = prepare_ml_data(
            df,
            target_column,
        )

        # ----------------------------------------------------
        # Train model
        # ----------------------------------------------------

        model = train_model(
            X_train,
            y_train,
            model_name,
        )

        # ----------------------------------------------------
        # Save model
        # ----------------------------------------------------

        model_path = save_model(
            model,
            dataset_id,
            model_name,
        )

        # ----------------------------------------------------
        # Evaluate model
        # ----------------------------------------------------

        evaluation = evaluate_model(
            model,
            X_test,
            y_test,
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {
            "dataset_id": dataset_id,
            "model": model_name,
            "target_column": target_column,
            "model_file": model_path.name,
            "preparation": summary,
            "evaluation": evaluation,
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Model training failed: {str(error)}",
        )


# ============================================================
# COMPARE MODELS
# ============================================================

@router.post("/{dataset_id}/compare")
def compare_models(
    dataset_id: str,
    target_column: str,
):
    """
    Train and evaluate all supported classification models
    and identify the best model based on F1-score.
    """

    file_path = get_processed_file(dataset_id)

    if file_path is None:
        raise HTTPException(
            status_code=404,
            detail="Processed dataset not found. Process the dataset first.",
        )

    try:

        # ----------------------------------------------------
        # Load dataset
        # ----------------------------------------------------

        df = load_dataset(str(file_path))

        # ----------------------------------------------------
        # Prepare ML data
        # ----------------------------------------------------

        (
            X_train,
            X_test,
            y_train,
            y_test,
            summary,
        ) = prepare_ml_data(
            df,
            target_column,
        )

        # ----------------------------------------------------
        # Train all models
        # ----------------------------------------------------

        trained_models = train_multiple_models(
            X_train,
            y_train,
        )

        # ----------------------------------------------------
        # Evaluate all models
        # ----------------------------------------------------

        evaluation_results = evaluate_multiple_models(
            trained_models,
            X_test,
            y_test,
        )

        # ----------------------------------------------------
        # Find best model
        # ----------------------------------------------------

        best_model = find_best_model(
            evaluation_results
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {
            "dataset_id": dataset_id,
            "target_column": target_column,
            "preparation": summary,
            "models": evaluation_results,
            "best_model": best_model,
            "best_f1_score": evaluation_results[best_model]["f1_score"],
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Model comparison failed: {str(error)}",
        )


# ============================================================
# PREDICT
# ============================================================

@router.post("/{dataset_id}/predict")
def predict_dataset(
    dataset_id: str,
    request: PredictionRequest,
):
    """
    Make a prediction using a previously trained model.
    """

    file_path = get_processed_file(dataset_id)

    if file_path is None:
        raise HTTPException(
            status_code=404,
            detail="Processed dataset not found. Process the dataset first.",
        )

    try:

        # ----------------------------------------------------
        # Load the processed dataset
        # ----------------------------------------------------

        training_df = load_dataset(
            str(file_path)
        )

        # ----------------------------------------------------
        # Recreate the exact feature columns used during
        # ML training.
        #
        # IMPORTANT:
        # Loan_Status is the target.
        # Therefore Loan_Status_N and Loan_Status_Y
        # must NOT be prediction features.
        # ----------------------------------------------------

        (
            _,
            _,
            _,
            _,
            preparation,
        ) = prepare_ml_data(
            training_df,
            "Loan_Status",
        )

        training_columns = preparation["feature_columns"]

        # ----------------------------------------------------
        # Load trained model
        # ----------------------------------------------------

        model = load_saved_model(
            dataset_id,
            request.model_name,
        )

        # ----------------------------------------------------
        # Prepare prediction input using the same feature
        # structure as training.
        # ----------------------------------------------------

        features = prepare_prediction_features(
            request.features,
            training_columns,
        )

        # ----------------------------------------------------
        # Make prediction
        # ----------------------------------------------------

        prediction = make_prediction(
            model,
            features,
        )

        # ----------------------------------------------------
        # Prediction probabilities
        # ----------------------------------------------------

        probabilities = get_prediction_probabilities(
            model,
            features,
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {
            "dataset_id": dataset_id,
            "model": request.model_name,
            "prediction": prediction,
            "probabilities": probabilities,
        }

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error),
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}",
        )