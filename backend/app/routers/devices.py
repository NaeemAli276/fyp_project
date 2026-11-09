from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from app.deps import current_user
from app.supabase_client import supabase_admin

router = APIRouter(prefix='/users', tags=["devices"])

class DeviceTokenIn(BaseModel):
    token: str = Field(min_length=10)
    platform: str = Field(pattern="^(ios|android)$")


@router.post("/register-device")
async def register_device(payload: DeviceTokenIn, user_id: str=Depends(current_user)):

    # save or update a push token for the current user

    supabase_admin.table("push_tokens").upsert(
        {
            "user_id": user_id,
            "token": payload.token,
            "platform": payload.platform
        },
        on_conflict="user_id, token"
    ).execute()
    return {"ok": True}