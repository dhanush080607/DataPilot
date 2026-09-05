import joblib
import pandas as pd
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[3]
MODELS_DIR = BASE_DIR / "storage" / "models"


def save_model(
    model,
    dataset_id: str,
    model_name: str,
) -> Path:
    """
    Save a trained ML model to storage.
    """

    MODELS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    model_path = (
        MODELS_DIR
        / f"{dataset_id}_{model_name}.joblib"
    )

    joblib.dump(
        model,
        model_path,
    )

    return model_path
def load_saved_model(
    dataset_id: str,
    model_name: str,
):
    """
    Load a previously saved ML model.
    """

    model_path = (
        MODELS_DIR
        / f"{dataset_id}_{model_name}.joblib"
    )

    if not model_path.exists():
        raise FileNotFoundError(
            "Trained model not found. "
            "Train the model first."
        )

    return joblib.load(model_path)


def make_prediction(
    model,
    features: pd.DataFrame,
) -> list:
    """
    Make predictions using a trained ML model.
    """

    if features.empty:
        raise ValueError(
            "Prediction features are empty."
        )

    predictions = model.predict(features)

    return predictions.tolist()


def predict_single(
    model,
    features: pd.DataFrame,
) -> object:
    """
    Make a prediction for a single record.
    """

    predictions = make_prediction(
        model,
        features,
    )

    if not predictions:
        raise ValueError(
            "No prediction was generated."
        )

    return predictions[0]


def get_prediction_probabilities(
    model,
    features: pd.DataFrame,
) -> list | None:
    """
    Return prediction probabilities when supported
    by the trained model.
    """

    if features.empty:
        raise ValueError(
            "Prediction features are empty."
        )

    if not hasattr(
        model,
        "predict_proba",
    ):
        return None

    probabilities = model.predict_proba(
        features
    )

    return probabilities.tolist()