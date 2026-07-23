from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime

class CheckRequest(BaseModel):
    id: str = Field(..., pattern=r'^\d+$', description="Player ID numeric")
    server: str = Field(..., pattern=r'^\d+$', description="Server ID numeric")

class SkinItem(BaseModel):
    skin_id: str
    name: str
    rarity: str
    image_url: str

class HeroCollection(BaseModel):
    hero_id: str
    hero_name: str
    role: str
    image_url: str
    skin_count: int
    skins: List[SkinItem]

class PlayerData(BaseModel):
    avatar: str
    nickname: str
    player_id: str
    server_id: str
    region: str
    total_heroes: int
    total_skins: int
    rarity_count: Dict[str, int]
    last_update: str
    heroes: List[HeroCollection]

class CheckResponse(BaseModel):
    data: PlayerData
    cached: bool
    source: str = "mock_provider"

class HistoryItem(BaseModel):
    player_id_input: str
    server_id_input: str
    nickname_snapshot: str
    checked_at: datetime
