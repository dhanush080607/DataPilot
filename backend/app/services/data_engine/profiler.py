import pandas as pd


def profile_dataset(file_path: str) -> dict:
    """
    Analyze a CSV or Excel dataset and return
    basic dataset information.
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")

    numeric_columns = df.select_dtypes(
        include="number"
    ).columns.tolist()

    categorical_columns = df.select_dtypes(
        include=["object", "category", "bool"]
    ).columns.tolist()

    missing_values = int(df.isnull().sum().sum())

    duplicate_rows = int(df.duplicated().sum())

    columns = []

    for column in df.columns:
        columns.append({
            "name": column,
            "data_type": str(df[column].dtype),
            "missing": int(df[column].isnull().sum()),
            "unique": int(df[column].nunique())
        })

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "numeric_columns": numeric_columns,
        "categorical_columns": categorical_columns,
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "column_details": columns
    }