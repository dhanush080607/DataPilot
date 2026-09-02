from fastapi import APIRouter

from app.api.v1.endpoints import upload
from app.api.v1.endpoints import datasets

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