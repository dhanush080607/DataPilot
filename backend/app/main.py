from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import router

app = FastAPI(
    title="DataPilot API",
    description="AI-powered data analytics platform",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router,
    prefix="/api/v1"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to DataPilot API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }   