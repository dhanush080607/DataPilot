import pandas as pd


def prepare_visualization_data(
    file_path: str,
    column: str,
    chart_type: str = "auto",
    limit: int = 20
) -> dict:
    """
    Prepare chart-ready data for a dataset column.
    """

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")

    if column not in df.columns:
        raise ValueError(
            f"Column '{column}' not found in dataset"
        )

    series = df[column].dropna()

    # Automatically determine chart type
    if chart_type == "auto":
        if pd.api.types.is_numeric_dtype(series):
            chart_type = "histogram"
        else:
            chart_type = "bar"

    # Numeric column
    if chart_type == "histogram":

        if not pd.api.types.is_numeric_dtype(series):
            raise ValueError(
                "Histogram requires a numeric column"
            )

        counts, bins = pd.cut(
            series,
            bins=10,
            retbins=True
        )

        distribution = (
            series.groupby(counts, observed=False)
            .size()
            .reset_index(name="count")
        )

        data = []

        for _, row in distribution.iterrows():
            interval = row.iloc[0]

            data.append({
                "range": str(interval),
                "count": int(row["count"])
            })

        return {
            "column": column,
            "chart_type": "histogram",
            "data": data
        }

    # Categorical column
    elif chart_type == "bar":

        counts = (
            series
            .value_counts()
            .head(limit)
        )

        data = []

        for category, count in counts.items():
            data.append({
                "category": str(category),
                "count": int(count)
            })

        return {
            "column": column,
            "chart_type": "bar",
            "data": data
        }

    else:
        raise ValueError(
            "Unsupported chart type. "
            "Use 'auto', 'histogram', or 'bar'."
        )