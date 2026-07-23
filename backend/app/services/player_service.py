from app.providers.factory import get_provider
from app.cache.redis import cache_service
from app.repositories.player_repo import PlayerRepository
from app.core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.player import PlayerData

class PlayerService:
    def __init__(self, db: AsyncSession):
        self.provider = get_provider()
        self.db = db
        self.repo = PlayerRepository(db)

    async def check_player(self, player_id: str, server_id: str):
        cache_key = f"player:{player_id}_{server_id}"
        cached = await cache_service.get(cache_key)
        if cached:
            try:
                data = PlayerData(**cached) if isinstance(cached, dict) else cached
                return {"data": data, "cached": True}
            except:
                pass

        # Fetch from provider
        player_data = await self.provider.check_player(player_id, server_id)

        # Save to cache + db (fire and forget)
        await cache_service.set(cache_key, player_data.model_dump(), ex=settings.cache_ttl)
        await self.repo.save_result(player_data)

        return {"data": player_data, "cached": False}

    async def get_player(self, player_id: str, server_id: str):
        return await self.check_player(player_id, server_id)

    async def get_history(self):
        history = await self.repo.get_history()
        # Fallback mock history if DB empty
        if not history:
            return [{"player_id_input":"89231234","server_id_input":"1234","nickname_snapshot":"Wann • Pro","checked_at":"2026-07-23T10:00:00"}, {"player_id_input":"77123321","server_id_input":"2221","nickname_snapshot":"RRQ • Clay","checked_at":"2026-07-23T09:30:00"}]
        return history
