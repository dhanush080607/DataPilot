import pandas as pd


def calculate_statistics(file_path: str) -> dict:
    """
    Calculate statistical information for all numeric columns.
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")

    numeric_df = df.select_dtypes(include="number")

    statistics = {}

    for column in numeric_df.columns:
        series = numeric_df[column]

        statistics[column] = {
            "mean": round(float(series.mean()), 4),
            "median": round(float(series.median()), 4),
            "minimum": round(float(series.min()), 4),
            "maximum": round(float(series.max()), 4),
            "standard_deviation": round(float(series.std()), 4),
            "variance": round(float(series.var()), 4),
        }

    return {
        "numeric_columns": list(numeric_df.columns),
        "statistics": statistics
    }