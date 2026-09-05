from pydantic import BaseModel
from typing import Any


class PredictionRequest(BaseModel):
    model_name: str = "logistic_regression"
    features: dict[str, Any]