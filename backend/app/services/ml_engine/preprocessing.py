import pandas as pd
from sklearn.model_selection import train_test_split


def prepare_features_and_target(
    df: pd.DataFrame,
    target_column: str,
) -> tuple[pd.DataFrame, pd.Series]:
    """
    Separate a dataset into features (X) and target (y).
    """

    if target_column not in df.columns:
        raise ValueError(
            f"Target column '{target_column}' not found."
        )

    if df[target_column].isnull().any():
        raise ValueError(
            "Target column contains missing values."
        )

    X = df.drop(columns=[target_column])
    y = df[target_column]

    if X.empty:
        raise ValueError(
            "No feature columns available."
        )

    return X, y


def split_dataset(
    X: pd.DataFrame,
    y: pd.Series,
    test_size: float = 0.2,
    random_state: int = 42,
) -> tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """
    Split features and target into training and testing sets.
    """

    if not 0 < test_size < 1:
        raise ValueError(
            "test_size must be between 0 and 1."
        )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=test_size,
            random_state=random_state,
        )
    )

    return (
        X_train,
        X_test,
        y_train,
        y_test,
    )


def prepare_ml_data(
    df: pd.DataFrame,
    target_column: str,
    test_size: float = 0.2,
    random_state: int = 42,
) -> tuple[
    pd.DataFrame,
    pd.DataFrame,
    pd.Series,
    pd.Series,
    dict,
]:
    """
    Prepare a dataset for machine learning.
    """

    X, y = prepare_features_and_target(
        df,
        target_column,
    )

    X_train, X_test, y_train, y_test = split_dataset(
        X,
        y,
        test_size,
        random_state,
    )

    summary = {
        "target_column": target_column,
        "feature_columns": X.columns.tolist(),
        "feature_count": int(X.shape[1]),
        "total_samples": int(len(df)),
        "training_samples": int(len(X_train)),
        "testing_samples": int(len(X_test)),
        "test_size": test_size,
    }

    return (
        X_train,
        X_test,
        y_train,
        y_test,
        summary,
    )