import pandas as pd


def calculate_correlation(file_path: str) -> dict:
    """
    Calculate correlation between numeric columns.
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")

    numeric_df = df.select_dtypes(include="number")

    if numeric_df.empty:
        return {
            "columns": [],
            "correlation_matrix": {}
        }

    correlation = numeric_df.corr()

    # Replace NaN values with None
    correlation = correlation.astype(object)
    correlation = correlation.where(
        pd.notna(correlation),
        None
    )

    return {
        "columns": numeric_df.columns.tolist(),
        "correlation_matrix": correlation.to_dict()
    }