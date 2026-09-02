from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.services.data_engine.profiler import (
    profile_dataset,
    get_dataset_preview
)


router = APIRouter()

UPLOAD_DIR = Path("storage/uploads")


@router.get("/{dataset_id}/profile")
def get_dataset_profile(dataset_id: str):
    """
    Get dataset profile information.
    """

    matching_files = list(
        UPLOAD_DIR.glob(f"{dataset_id}.*")
    )

    if not matching_files:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    file_path = matching_files[0]

    try:
        profile = profile_dataset(
            str(file_path)
        )

        return {
            "dataset_id": dataset_id,
            "filename": file_path.name,
            "profile": profile
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to profile dataset: {str(error)}"
        )


@router.get("/{dataset_id}/preview")
def get_dataset_preview_api(dataset_id: str):
    """
    Get the first 10 rows of a dataset.
    """

    matching_files = list(
        UPLOAD_DIR.glob(f"{dataset_id}.*")
    )

    if not matching_files:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    file_path = matching_files[0]

    try:
        preview = get_dataset_preview(
            str(file_path)
        )

        return {
            "dataset_id": dataset_id,
            "rows": preview
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to load dataset preview: {str(error)}"
        )