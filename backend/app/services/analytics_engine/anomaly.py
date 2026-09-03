import pandas as pd


def detect_anomalies(file_path: str) -> dict:
    """
    Detect outliers in numeric columns using the IQR method.
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")

    numeric_df = df.select_dtypes(include="number")

    anomalies = {}

    for column in numeric_df.columns:
        series = numeric_df[column].dropna()

        if series.empty:
            anomalies[column] = {
                "outlier_count": 0,
                "outlier_percentage": 0,
                "lower_bound": None,
                "upper_bound": None
            }
            continue

        q1 = series.quantile(0.25)
        q3 = series.quantile(0.75)

        iqr = q3 - q1

        lower_bound = q1 - (1.5 * iqr)
        upper_bound = q3 + (1.5 * iqr)

        outliers = series[
            (series < lower_bound) |
            (series > upper_bound)
        ]

        outlier_count = len(outliers)
        total_values = len(series)

        outlier_percentage = (
            (outlier_count / total_values) * 100
            if total_values > 0
            else 0
        )

        anomalies[column] = {
            "outlier_count": int(outlier_count),
            "outlier_percentage": round(
                float(outlier_percentage),
                2
            ),
            "lower_bound": round(
                float(lower_bound),
                4
            ),
            "upper_bound": round(
                float(upper_bound),
                4
            )
        }

    return {
        "numeric_columns": numeric_df.columns.tolist(),
        "anomalies": anomalies
    }