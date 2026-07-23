from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.models.player import Player, PlayerResult, History
from app.schemas.player import PlayerData
import json

class PlayerRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_result(self, player_data: PlayerData):
        try:
            # Upsert player
            result = await self.db.execute(select(Player).where(Player.player_id==player_data.player_id, Player.server_id==player_data.server_id))
            existing = result.scalar_one_or_none()
            if not existing:
                player = Player(
                    player_id=player_data.player_id,
                    server_id=player_data.server_id,
                    nickname=player_data.nickname,
                    avatar_url=player_data.avatar,
                    region=player_data.region,
                    total_heroes=player_data.total_heroes,
                    total_skins=player_data.total_skins
                )
                self.db.add(player)
            
            # Save result json
            pr = PlayerResult(player_id_fk=player_data.player_id, data_json=player_data.model_dump())
            self.db.add(pr)

            # Save history
            hist = History(player_id_input=player_data.player_id, server_id_input=player_data.server_id, nickname_snapshot=player_data.nickname)
            self.db.add(hist)

            await self.db.commit()
        except Exception as e:
            print(f"Repo save error (likely DB not configured, using cache only): {e}")
            await self.db.rollback()

    async def get_history(self, limit=10):
        try:
            res = await self.db.execute(select(History).order_by(desc(History.checked_at)).limit(limit))
            return res.scalars().all()
        except:
            return []
