from fastapi import APIRouter, HTTPException

from app.utils.file_utils import get_processed_file

from app.services.analytics_engine.statistics import calculate_statistics
from app.services.analytics_engine.correlation import calculate_correlation
from app.services.analytics_engine.anomaly import detect_anomalies

from app.services.ai_engine.insights import generate_insights


router = APIRouter()


@router.post("/{dataset_id}/insights")
def generate_dataset_insights(dataset_id: str):
    """
    Generate AI-powered insights for a processed dataset.
    """

    file_path = get_processed_file(dataset_id)

    if file_path is None:
        raise HTTPException(
            status_code=404,
            detail="Processed dataset not found. Process the dataset first."
        )

    try:
        statistics = calculate_statistics(str(file_path))
        correlation = calculate_correlation(str(file_path))
        anomalies = detect_anomalies(str(file_path))

        analysis_data = {
            "dataset_id": dataset_id,
            "statistics": statistics,
            "correlation": correlation,
            "anomalies": anomalies,
        }

        insights = generate_insights(analysis_data)

        return {
            "dataset_id": dataset_id,
            "insights": insights,
            "analysis": analysis_data,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"AI insight generation failed: {str(error)}"
        )