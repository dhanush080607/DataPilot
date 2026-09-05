import pandas as pd


def make_prediction(
    model,
    features: pd.DataFrame,
) -> list:
    """
    Make predictions using a trained ML model.
    """

    if features.empty:
        raise ValueError("Prediction features are empty.")

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
        raise ValueError("No prediction was generated.")

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
        raise ValueError("Prediction features are empty.")

    if not hasattr(model, "predict_proba"):
        return None

    probabilities = model.predict_proba(features)

    return probabilities.tolist()