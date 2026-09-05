from pathlib import Path

import pandas as pd


ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}


def validate_file_format(file_path: str) -> bool:
    """
    Validate whether the dataset uses a supported file format.
    """

    extension = Path(file_path).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(
            "Unsupported file format. "
            "Only CSV and Excel files are supported."
        )

    return True


def validate_dataset_not_empty(df: pd.DataFrame) -> bool:
    """
    Check whether the dataset contains rows and columns.
    """

    if df.empty:
        raise ValueError("Dataset is empty.")

    if df.shape[1] == 0:
        raise ValueError("Dataset contains no columns.")

    return True


def validate_column_names(df: pd.DataFrame) -> bool:
    """
    Validate dataset column names.
    """

    if any(
        column is None or str(column).strip() == ""
        for column in df.columns
    ):
        raise ValueError(
            "Dataset contains empty column names."
        )

    if df.columns.duplicated().any():
        raise ValueError(
            "Dataset contains duplicate column names."
        )

    return True


def validate_dataset(file_path: str) -> dict:
    """
    Perform basic validation of a CSV or Excel dataset.
    """

    validate_file_format(file_path)

    extension = Path(file_path).suffix.lower()

    if extension == ".csv":
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    validate_dataset_not_empty(df)
    validate_column_names(df)

    return {
        "valid": True,
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "missing_values": int(df.isnull().sum().sum()),
        "duplicate_rows": int(df.duplicated().sum()),
        "column_names": df.columns.tolist(),
    }