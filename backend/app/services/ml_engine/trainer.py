import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.base import clone


MODELS = {
    "logistic_regression": LogisticRegression(
        max_iter=1000
    ),
    "decision_tree": DecisionTreeClassifier(
        random_state=42
    ),
    "random_forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    ),
}


def get_available_models() -> list[str]:
    """
    Return the machine learning models supported by DataPilot.
    """
    return list(MODELS.keys())


def train_model(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    model_name: str,
):
    """
    Train a classification model.
    """

    if model_name not in MODELS:
        raise ValueError(
            f"Unsupported model: {model_name}. "
            f"Available models: {get_available_models()}"
        )

    if X_train.empty:
        raise ValueError("Training features are empty.")

    if y_train.empty:
        raise ValueError("Training target is empty.")

    model = clone(MODELS[model_name])

    model.fit(X_train, y_train)

    return model


def train_multiple_models(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    model_names: list[str] | None = None,
) -> dict:
    """
    Train multiple classification models.
    """

    if model_names is None:
        model_names = get_available_models()

    trained_models = {}

    for model_name in model_names:
        trained_models[model_name] = train_model(
            X_train,
            y_train,
            model_name,
        )

    return trained_models