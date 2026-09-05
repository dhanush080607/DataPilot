from pathlib import Path
import shutil


BASE_STORAGE_DIR = Path("storage")

UPLOAD_DIR = BASE_STORAGE_DIR / "uploads"
PROCESSED_DIR = BASE_STORAGE_DIR / "processed"
REPORTS_DIR = BASE_STORAGE_DIR / "reports"
MODELS_DIR = BASE_STORAGE_DIR / "models"


def ensure_storage_directories() -> None:
    """
    Create all required storage directories.
    """

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    MODELS_DIR.mkdir(parents=True, exist_ok=True)


def get_uploaded_file(
    dataset_id: str,
) -> Path | None:
    """
    Find an uploaded dataset using its dataset ID.
    """

    ensure_storage_directories()

    matching_files = list(
        UPLOAD_DIR.glob(f"{dataset_id}.*")
    )

    if not matching_files:
        return None

    return matching_files[0]


def get_processed_file(
    dataset_id: str,
) -> Path | None:
    """
    Find a processed dataset using its dataset ID.
    """

    ensure_storage_directories()

    matching_files = list(
        PROCESSED_DIR.glob(f"{dataset_id}.*")
    )

    if not matching_files:
        return None

    return matching_files[0]


def save_processed_file(
    source_file: str,
    dataset_id: str,
) -> Path:
    """
    Save a processed dataset file.
    """

    ensure_storage_directories()

    source_path = Path(source_file)

    output_path = (
        PROCESSED_DIR
        / f"{dataset_id}.csv"
    )

    shutil.copy2(
        source_path,
        output_path,
    )

    return output_path


def delete_file(file_path: str | Path) -> bool:
    """
    Delete a file if it exists.
    """

    path = Path(file_path)

    if not path.exists():
        return False

    path.unlink()

    return True