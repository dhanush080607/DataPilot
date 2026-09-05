from fastapi import APIRouter, HTTPException

from app.utils.file_utils import get_processed_file

from app.services.data_engine.profiler import load_dataset
from app.services.ml_engine.preprocessing import prepare_ml_data
from app.services.ml_engine.trainer import (
    train_model,
    get_available_models,
)
from app.services.ml_engine.evaluator import evaluate_model
from app.services.ml_engine.predictor import make_prediction


router = APIRouter()


@router.get("/models")
def available_models():
    """
    Return the ML models supported by DataPilot.
    """
    return {
        "models": get_available_models()
    }


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
        df = load_dataset(str(file_path))

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

        model = train_model(
            X_train,
            y_train,
            model_name,
        )

        evaluation = evaluate_model(
            model,
            X_test,
            y_test,
        )

        return {
            "dataset_id": dataset_id,
            "model": model_name,
            "target_column": target_column,
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