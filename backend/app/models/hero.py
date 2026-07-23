from sqlalchemy import Column, String, Integer
from app.database.session import Base
import uuid

class Hero(Base):
    __tablename__ = "heroes"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hero_id = Column(String, unique=True)
    name = Column(String)
    role = Column(String)
    image_url = Column(String)

class Skin(Base):
    __tablename__ = "skins"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    skin_id = Column(String, unique=True)
    hero_id = Column(String, index=True)
    name = Column(String)
    rarity = Column(String, index=True)
    image_url = Column(String)
    is_limited = Column(Integer, default=0)
