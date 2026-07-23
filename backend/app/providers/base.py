from abc import ABC, abstractmethod
from app.schemas.player import PlayerData

class BaseProvider(ABC):
    @abstractmethod
    async def check_player(self, player_id: str, server_id: str) -> PlayerData:
        pass

    @abstractmethod
    def provider_name(self) -> str:
        pass
