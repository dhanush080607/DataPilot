import pandas as pd


def load_dataset(file_path: str) -> pd.DataFrame:
    """
    Load a CSV or Excel dataset into a Pandas DataFrame.
    """

    if file_path.endswith(".csv"):
        return pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        return pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")


def profile_dataset(file_path: str) -> dict:
    """
    Generate a basic profile of the dataset.
    """

    df = load_dataset(file_path)

    numeric_columns = (
        df.select_dtypes(include="number")
        .columns
        .tolist()
    )

    categorical_columns = (
        df.select_dtypes(
            include=["object", "category", "bool"]
        )
        .columns
        .tolist()
    )

    missing_values = int(
        df.isnull().sum().sum()
    )

    duplicate_rows = int(
        df.duplicated().sum()
    )

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


def get_dataset_preview(
    file_path: str,
    limit: int = 10
) -> list:
    """
    Return the first few rows of the dataset.
    """

    df = load_dataset(file_path)

    # Get only the required number of rows
    df = df.head(limit)

    # Convert dataframe to object type first
    # so None values are preserved
    df = df.astype(object)

    # Replace NaN / NaT values with None
    df = df.where(pd.notna(df), None)

    # Convert to JSON-compatible dictionaries
    return df.to_dict(orient="records")