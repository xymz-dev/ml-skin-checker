"""
Production Upstash Redis implementation using REST API
Supports both @upstash/redis python package and fallback HTTP
"""
import os
import json
import httpx
from typing import Optional, Any
from app.core.config import settings

class UpstashCache:
    def __init__(self):
        self.url = settings.redis_url
        self.token = settings.redis_token
        self.enabled = bool(self.url and self.token)
        # In-memory fallback
        self.memory = {}

    async def get(self, key: str) -> Optional[Any]:
        if not self.enabled:
            return self.memory.get(key)
        try:
            async with httpx.AsyncClient() as client:
                res = await client.get(f"{self.url}/get/{key}", headers={"Authorization": f"Bearer {self.token}"}, timeout=5)
                if res.status_code == 200:
                    data = res.json()
                    result = data.get("result")
                    if result:
                        try:
                            return json.loads(result)
                        except:
                            return result
                return None
        except Exception as e:
            print(f"Upstash GET fail {e}, fallback memory")
            return self.memory.get(key)

    async def set(self, key: str, value: Any, ex: int = 1800):
        dump = json.dumps(value) if not isinstance(value, str) else value
        self.memory[key] = value
        if not self.enabled:
            return
        try:
            async with httpx.AsyncClient() as client:
                # Upstash REST set with EX
                await client.get(f"{self.url}/set/{key}/{dump}?EX={ex}", headers={"Authorization": f"Bearer {self.token}"}, timeout=5)
        except Exception as e:
            print(f"Upstash SET fail {e}")

    async def delete(self, key: str):
        self.memory.pop(key, None)
        if not self.enabled:
            return
        try:
            async with httpx.AsyncClient() as client:
                await client.get(f"{self.url}/del/{key}", headers={"Authorization": f"Bearer {self.token}"}, timeout=5)
        except:
            pass

# Singleton
upstash_cache = UpstashCache()
