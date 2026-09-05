import pandas as pd


def load_dataset(file_path: str) -> pd.DataFrame:
    """
    Load a CSV or Excel dataset.
    """

    if file_path.endswith(".csv"):
        return pd.read_csv(file_path)

    elif file_path.endswith((".xlsx", ".xls")):
        return pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")


def remove_duplicate_rows(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, int]:
    """
    Remove duplicate rows from the dataset.
    """

    duplicate_count = int(df.duplicated().sum())

    cleaned_df = df.drop_duplicates().copy()

    return cleaned_df, duplicate_count


def fill_missing_values(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, int]:
    """
    Fill missing values using simple data-type based strategies.
    """

    cleaned_df = df.copy()

    missing_before = int(
        cleaned_df.isnull().sum().sum()
    )

    for column in cleaned_df.columns:
        if cleaned_df[column].isnull().sum() == 0:
            continue

        if pd.api.types.is_numeric_dtype(
            cleaned_df[column]
        ):
            median = cleaned_df[column].median()

            if pd.notna(median):
                cleaned_df[column] = (
                    cleaned_df[column].fillna(median)
                )

        else:
            mode = cleaned_df[column].mode()

            if not mode.empty:
                cleaned_df[column] = (
                    cleaned_df[column].fillna(mode.iloc[0])
                )

    return cleaned_df, missing_before


def clean_dataset(file_path: str) -> tuple[pd.DataFrame, dict]:
    """
    Clean a dataset by removing duplicates
    and filling missing values.
    """

    df = load_dataset(file_path)

    original_rows = len(df)
    original_missing = int(
        df.isnull().sum().sum()
    )

    df, duplicates_removed = remove_duplicate_rows(df)

    df, _ = fill_missing_values(df)

    remaining_missing = int(
        df.isnull().sum().sum()
    )

    cleaning_summary = {
        "original_rows": original_rows,
        "final_rows": int(len(df)),
        "duplicates_removed": duplicates_removed,
        "missing_values_before": original_missing,
        "missing_values_after": remaining_missing,
        "rows_removed": original_rows - len(df),
    }

    return df, cleaning_summary