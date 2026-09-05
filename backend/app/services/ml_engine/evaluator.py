import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)


def evaluate_model(
    model,
    X_test: pd.DataFrame,
    y_test: pd.Series,
) -> dict:
    """
    Evaluate a trained classification model.
    """

    if X_test.empty:
        raise ValueError("Testing features are empty.")

    if y_test.empty:
        raise ValueError("Testing target is empty.")

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions,
    )

    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0,
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0,
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0,
    )

    matrix = confusion_matrix(
        y_test,
        predictions,
    )

    return {
        "accuracy": round(float(accuracy), 4),
        "precision": round(float(precision), 4),
        "recall": round(float(recall), 4),
        "f1_score": round(float(f1), 4),
        "confusion_matrix": matrix.tolist(),
        "test_samples": int(len(y_test)),
    }


def evaluate_multiple_models(
    trained_models: dict,
    X_test: pd.DataFrame,
    y_test: pd.Series,
) -> dict:
    """
    Evaluate multiple trained models.
    """

    results = {}

    for model_name, model in trained_models.items():
        results[model_name] = evaluate_model(
            model,
            X_test,
            y_test,
        )

    return results


def find_best_model(
    evaluation_results: dict,
) -> str:
    """
    Find the best model based on F1-score.
    """

    if not evaluation_results:
        raise ValueError(
            "No evaluation results available."
        )

    best_model = max(
        evaluation_results,
        key=lambda name: evaluation_results[name]["f1_score"],
    )

    return best_model