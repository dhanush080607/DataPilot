import pandas as pd


def encode_categorical_columns(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, dict]:
    """
    Convert categorical columns into numeric values
    using one-hot encoding.
    """

    categorical_columns = df.select_dtypes(
        include=["object", "category", "bool"]
    ).columns.tolist()

    if not categorical_columns:
        return df.copy(), {
            "encoded_columns": [],
            "original_categorical_columns": [],
        }

    transformed_df = pd.get_dummies(
        df,
        columns=categorical_columns,
        drop_first=False,
        dtype=int,
    )

    return transformed_df, {
        "encoded_columns": [
            column
            for column in transformed_df.columns
            if column not in df.columns
        ],
        "original_categorical_columns": categorical_columns,
    }


def convert_numeric_columns(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, dict]:
    """
    Convert numeric columns to numeric data types where possible.
    """

    transformed_df = df.copy()
    converted_columns = []

    for column in transformed_df.columns:
        if pd.api.types.is_numeric_dtype(
            transformed_df[column]
        ):
            transformed_df[column] = pd.to_numeric(
                transformed_df[column],
                errors="coerce",
            )

            converted_columns.append(column)

    return transformed_df, {
        "converted_columns": converted_columns,
    }


def transform_dataset(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, dict]:
    """
    Apply basic transformations required for
    analytics and machine learning.
    """

    transformed_df, encoding_info = (
        encode_categorical_columns(df)
    )

    transformed_df, numeric_info = (
        convert_numeric_columns(transformed_df)
    )

    transformation_summary = {
        "original_columns": int(df.shape[1]),
        "transformed_columns": int(
            transformed_df.shape[1]
        ),
        "categorical_columns_encoded": encoding_info[
            "original_categorical_columns"
        ],
        "new_encoded_columns": encoding_info[
            "encoded_columns"
        ],
        "numeric_columns_converted": numeric_info[
            "converted_columns"
        ],
    }

    return transformed_df, transformation_summary