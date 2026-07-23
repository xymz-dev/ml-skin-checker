"""
Seed script for Supabase
python seed.py -- will populate heroes & skins reference
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/ml_checker")

# Minimal models duplication for seeding
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, String, Integer

class Base(DeclarativeBase):
    pass

class Hero(Base):
    __tablename__ = "heroes"
    id = Column(String, primary_key=True)
    hero_id = Column(String, unique=True)
    name = Column(String)
    role = Column(String)
    image_url = Column(String)

HEROES_DATA = [
    ("h001","Layla","Marksman"), ("h002","Miya","Marksman"), ("h003","Alucard","Fighter"),
    ("h004","Gusion","Assassin"), ("h005","Ling","Assassin"), ("h006","Hayabusa","Assassin"),
    ("h007","Fanny","Assassin"), ("h008","Aamon","Assassin"), ("h009","Lylia","Mage"),
    ("h010","Esmeralda","Tank"), ("h011","Beatrix","Marksman"), ("h012","Paquito","Fighter"),
    ("h013","Mathilda","Support"), ("h014","Yve","Support"), ("h015","Brody","Marksman"),
]

async def seed():
    engine = create_async_engine(DATABASE_URL, echo=True)
    async_session = async_sessionmaker(engine)
    async with async_session() as session:
        for hero_id, name, role in HEROES_DATA:
            # upsert logic simple
            from sqlalchemy import select
            res = await session.execute(select(Hero).where(Hero.hero_id==hero_id))
            if not res.scalar_one_or_none():
                h = Hero(id=hero_id, hero_id=hero_id, name=name, role=role, image_url=f"https://picsum.photos/seed/{hero_id}/200/200")
                session.add(h)
        await session.commit()
    print("✅ Seed done")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed())
