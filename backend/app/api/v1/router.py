from fastapi import APIRouter

from app.api.v1.endpoints import upload
from app.api.v1.endpoints import datasets
from app.api.v1.endpoints import processing
from app.api.v1.endpoints import ml
from app.api.v1.endpoints.ai import router as ai_router

router = APIRouter()

router.include_router(
    upload.router,
    prefix="/datasets",
    tags=["Datasets"]
)

router.include_router(
    datasets.router,
    prefix="/datasets",
    tags=["Datasets"]
)
router.include_router(
    processing.router,
    prefix="/datasets",
    tags=["Data Processing"]
)
router.include_router(
    ml.router,
    prefix="/ml",
    tags=["ML"]
)
router.include_router(ai_router, prefix="/ai", tags=["AI"])