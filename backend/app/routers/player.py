from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.schemas.player import CheckRequest, CheckResponse, PlayerData
from app.services.player_service import PlayerService
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api", tags=["Player"])

@router.post("/check", response_model=CheckResponse)
@limiter.limit("20/minute")
async def check_player(req: Request, payload: CheckRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = PlayerService(db)
        result = await service.check_player(payload.id, payload.server)
        return CheckResponse(data=result["data"], cached=result["cached"], source="mock_provider")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/player/{player_id}")
@limiter.limit("30/minute")
async def get_player(req: Request, player_id: str, server: str, db: AsyncSession = Depends(get_db)):
    service = PlayerService(db)
    result = await service.get_player(player_id, server)
    return result["data"]

@router.get("/history")
async def get_history(db: AsyncSession = Depends(get_db)):
    service = PlayerService(db)
    history = await service.get_history()
    return history

@router.get("/poster/{player_id}")
async def get_poster_data(player_id: str, server: str = "1234", db: AsyncSession = Depends(get_db)):
    service = PlayerService(db)
    result = await service.get_player(player_id, server)
    # Return same data, frontend will handle template
    return result["data"]
