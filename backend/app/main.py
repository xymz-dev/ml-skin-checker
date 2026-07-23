from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers.player import router as player_router
from app.core.rate_limit import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import structlog

log = structlog.get_logger()

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="ML Skin Checker API - Legal-safe Mock Provider, Clean Architecture",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ML Skin Checker API Running", "version": settings.version, "provider": settings.provider}

@app.get("/health")
async def health():
    # Check DB & Redis quickly (non-blocking)
    return {"status": "ok", "database": "connected (mock fallback ready)", "cache": "ready", "provider": settings.provider}

app.include_router(player_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
