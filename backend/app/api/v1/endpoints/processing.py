from fastapi import APIRouter, HTTPException

from app.services.data_engine.validator import validate_dataset
from app.services.data_engine.cleaner import clean_dataset
from app.services.data_engine.transformer import transform_dataset

from app.utils.file_utils import (
    get_uploaded_file,
    save_processed_file,
    PROCESSED_DIR,
)


router = APIRouter()


@router.post("/{dataset_id}/process")
def process_dataset(dataset_id: str):
    """
    Validate, clean, transform, and save
    an uploaded dataset.
    """

    file_path = get_uploaded_file(dataset_id)

    if file_path is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    try:
        # 1. Validate
        validation = validate_dataset(
            str(file_path)
        )

        # 2. Clean
        cleaned_df, cleaning_summary = clean_dataset(
            str(file_path)
        )

        # 3. Transform
        transformed_df, transformation_summary = (
            transform_dataset(cleaned_df)
        )

        # 4. Save processed dataset
        processed_path = (
            PROCESSED_DIR
            / f"{dataset_id}.csv"
        )

        transformed_df.to_csv(
            processed_path,
            index=False,
        )

        return {
            "dataset_id": dataset_id,
            "validation": validation,
            "cleaning": cleaning_summary,
            "transformation": transformation_summary,
            "processed_file": processed_path.name,
            "final_rows": int(
                transformed_df.shape[0]
            ),
            "final_columns": int(
                transformed_df.shape[1]
            ),
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to process dataset: "
                f"{str(error)}"
            ),
        )