# Vercel Serverless - FIXED v2 - Support both / and /api/ routes
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import random
from datetime import datetime
from typing import List, Dict

app = FastAPI(
    title="ML Skin Checker API - Vercel",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckRequest(BaseModel):
    id: str = Field(..., pattern=r'^\d+$')
    server: str = Field(..., pattern=r'^\d+$')

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

ROLES = ["Tank","Fighter","Assassin","Mage","Marksman","Support"]
RARITIES = ["Grand","Exquisite","Deluxe","Exceptional","Common"]
HEROES = ["Layla","Miya","Alucard","Gusion","Ling","Hayabusa","Fanny","Aamon","Aulus","Beatrix","Melissa","Xavier","Julian"]
SKIN_NAMES = ["Collector","Legend","Epic","Starlight","Elite","Special","Luckybox","Neon","Cyber"]

def gen_mock(player_id: str, server_id: str) -> PlayerData:
    random.seed(f"{player_id}_{server_id}")
    total_heroes = random.randint(80, 124)
    heroes_list = []
    total_skins = 0
    rarity_count = {r: 0 for r in RARITIES}
    nicks = ["Wann","R7","Clay","Lemon","Alberttt","Sanz","Kairi","xymz"]
    nickname = f"{random.choice(nicks)} • Pro"
    for i in range(min(total_heroes, 25)):
        hero_name = random.choice(HEROES)
        skin_count = random.randint(1, 7)
        skins = []
        for j in range(skin_count):
            rarity = random.choice(RARITIES)
            rarity_count[rarity] += 1
            total_skins += 1
            skins.append(SkinItem(
                skin_id=f"skin_{player_id}_{i}_{j}",
                name=f"{hero_name} {random.choice(SKIN_NAMES)}",
                rarity=rarity,
                image_url=f"https://picsum.photos/seed/{player_id}{i}{j}/300/400"
            ))
        heroes_list.append(HeroCollection(
            hero_id=f"hero_{i}",
            hero_name=hero_name,
            role=random.choice(ROLES),
            image_url=f"https://picsum.photos/seed/hero{player_id}{i}/200/200",
            skin_count=skin_count,
            skins=skins
        ))
    return PlayerData(
        avatar=f"https://i.pravatar.cc/150?img={random.randint(1,70)}",
        nickname=nickname,
        player_id=player_id,
        server_id=server_id,
        region="Indonesia",
        total_heroes=total_heroes,
        total_skins=total_skins,
        rarity_count=rarity_count,
        last_update=datetime.utcnow().isoformat(),
        heroes=heroes_list
    )

cache = {}

# ROOT - support both / and /api and /api/ 
@app.get("/")
@app.get("/api")
@app.get("/api/")
async def root():
    return {"status": "ML Skin Checker API Running (Vercel)", "version": "1.0.0", "provider": "mock_vercel", "docs": "/docs", "health": "/health"}

@app.get("/health")
@app.get("/api/health")
async def health():
    return {"status": "ok", "provider": "mock_vercel"}

@app.post("/api/check")
@app.post("/check")
async def check(payload: CheckRequest):
    key = f"{payload.id}_{payload.server}"
    if key in cache:
        return {"data": cache[key], "cached": True}
    data = gen_mock(payload.id, payload.server)
    cache[key] = data
    return {"data": data, "cached": False}

@app.get("/api/player/{player_id}")
@app.get("/player/{player_id}")
async def get_player(player_id: str, server: str = "1234"):
    key = f"{player_id}_{server}"
    if key in cache:
        return cache[key]
    data = gen_mock(player_id, server)
    cache[key] = data
    return data

@app.get("/api/history")
@app.get("/history")
async def history():
    return [
        {"player_id_input":"12345678","server_id_input":"1234","nickname_snapshot":"xymz • Dev","checked_at": datetime.utcnow().isoformat()},
        {"player_id_input":"89231234","server_id_input":"1234","nickname_snapshot":"Wann • Pro","checked_at":"2026-07-23T10:00:00"}
    ]

@app.get("/api/poster/{player_id}")
@app.get("/poster/{player_id}")
async def poster(player_id: str, server: str = "1234"):
    key = f"{player_id}_{server}"
    if key in cache:
        return cache[key]
    return gen_mock(player_id, server)
