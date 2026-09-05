import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression


def prepare_time_series(
    df: pd.DataFrame,
    date_column: str,
    target_column: str,
) -> pd.DataFrame:
    """
    Prepare date and target columns for forecasting.
    """

    if date_column not in df.columns:
        raise ValueError(
            f"Date column '{date_column}' not found."
        )

    if target_column not in df.columns:
        raise ValueError(
            f"Target column '{target_column}' not found."
        )

    data = df[[date_column, target_column]].copy()

    data[date_column] = pd.to_datetime(
        data[date_column],
        errors="coerce",
    )

    data[target_column] = pd.to_numeric(
        data[target_column],
        errors="coerce",
    )

    data = data.dropna()

    if data.empty:
        raise ValueError(
            "No valid time-series data available."
        )

    data = data.sort_values(date_column)

    return data


def forecast(
    df: pd.DataFrame,
    date_column: str,
    target_column: str,
    periods: int = 5,
) -> list[dict]:
    """
    Forecast future values using linear regression.
    """

    if periods <= 0:
        raise ValueError(
            "Forecast periods must be greater than 0."
        )

    data = prepare_time_series(
        df,
        date_column,
        target_column,
    )

    if len(data) < 2:
        raise ValueError(
            "At least two data points are required for forecasting."
        )

    data = data.reset_index(drop=True)

    X = np.arange(len(data)).reshape(-1, 1)
    y = data[target_column].values

    model = LinearRegression()
    model.fit(X, y)

    future_X = np.arange(
        len(data),
        len(data) + periods,
    ).reshape(-1, 1)

    predictions = model.predict(future_X)

    last_date = data[date_column].iloc[-1]

    if len(data) >= 2:
        frequency = (
            data[date_column].iloc[-1]
            - data[date_column].iloc[-2]
        )
    else:
        frequency = pd.Timedelta(days=1)

    results = []

    for index, prediction in enumerate(predictions, start=1):
        future_date = last_date + (frequency * index)

        results.append(
            {
                "date": future_date.strftime("%Y-%m-%d"),
                "predicted_value": round(
                    float(prediction),
                    4,
                ),
            }
        )

    return results