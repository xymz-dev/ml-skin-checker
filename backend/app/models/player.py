from sqlalchemy import Column, String, Integer, DateTime, JSON, BigInteger
from sqlalchemy.sql import func
from app.database.session import Base
import uuid

class Player(Base):
    __tablename__ = "players"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    player_id = Column(String, index=True, nullable=False)
    server_id = Column(String, index=True, nullable=False)
    nickname = Column(String)
    avatar_url = Column(String)
    region = Column(String)
    total_heroes = Column(Integer, default=0)
    total_skins = Column(Integer, default=0)
    last_updated = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PlayerResult(Base):
    __tablename__ = "player_results"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    player_id_fk = Column(String, index=True)
    data_json = Column(JSON)
    cached_at = Column(DateTime(timezone=True), server_default=func.now())

class History(Base):
    __tablename__ = "history"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    player_id_input = Column(String)
    server_id_input = Column(String)
    nickname_snapshot = Column(String)
    checked_at = Column(DateTime(timezone=True), server_default=func.now())
