"""
Production Cache Service - Upstash first, fallback memory
"""
from app.cache.upstash import upstash_cache
from typing import Optional, Any

class CacheService:
    async def get(self, key: str) -> Optional[Any]:
        return await upstash_cache.get(key)
    async def set(self, key: str, value: Any, ex: int = 1800):
        await upstash_cache.set(key, value, ex=ex)
    async def delete(self, key: str):
        await upstash_cache.delete(key)

cache_service = CacheService()
