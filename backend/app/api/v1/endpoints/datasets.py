from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.services.analytics_engine.correlation import (
    calculate_correlation
)

from app.services.data_engine.profiler import (
    profile_dataset,
    get_dataset_preview
)

from app.services.analytics_engine.statistics import (
    calculate_statistics
)

from app.services.analytics_engine.anomaly import (
    detect_anomalies
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


@router.get("/{dataset_id}/statistics")
def get_dataset_statistics(dataset_id: str):
    """
    Get statistical information for numeric columns.
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
        statistics = calculate_statistics(
            str(file_path)
        )

        return {
            "dataset_id": dataset_id,
            "statistics": statistics
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to calculate statistics: {str(error)}"
        )
@router.get("/{dataset_id}/correlation")
def get_dataset_correlation(dataset_id: str):
    """
    Get correlation between numeric columns.
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
        correlation = calculate_correlation(
            str(file_path)
        )

        return {
            "dataset_id": dataset_id,
            "correlation": correlation
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to calculate correlation: {str(error)}"
        )
@router.get("/{dataset_id}/anomalies")
def get_dataset_anomalies(dataset_id: str):
    """
    Detect outliers in numeric columns.
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
        anomalies = detect_anomalies(
            str(file_path)
        )

        return {
            "dataset_id": dataset_id,
            "anomalies": anomalies
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to detect anomalies: {str(error)}"
        )