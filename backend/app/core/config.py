from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    app_name: str = "ML Skin Checker API"
    version: str = "1.0.0"
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/ml_checker"
    redis_url: str = ""
    redis_token: str = ""
    cors_origins: str = "http://localhost:3000,https://mlskinchecker.netlify.app"
    rate_limit_per_minute: int = 20
    provider: str = "mock"
    cache_ttl: int = 1800

    class Config:
        env_file = ".env"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

settings = Settings()
