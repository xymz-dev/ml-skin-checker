from app.providers.base import BaseProvider
from app.providers.mock_provider import MockProvider
from app.core.config import settings

def get_provider() -> BaseProvider:
    # Future: if settings.provider == "official" return OfficialProvider()
    # For now always mock for legal safety
    return MockProvider()
