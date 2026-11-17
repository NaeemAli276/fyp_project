import logging
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.deps import current_user
from app.supabase_client import supabase_admin

logger = logging.getLogger(__name__)

router = APIRouter(prefix='/users', tags=["devices"])

class DeviceTokenIn(BaseModel):
    token: str = Field(min_length=10)
    platform: str = Field(pattern="^(ios|android)$")


@router.post("/register-device")
async def register_device(payload: DeviceTokenIn, user_id: str=Depends(current_user)):

    """ Save or update a push token for the current user """

    profile = (
        supabase_admin.table("profiles")
        .select("email")
        .eq("id", user_id)
        .single()
        .execute()
    )

    if not profile.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    supabase_admin.table("push_tokens").upsert(
        {
            "user_id": user_id,
            "token": payload.token,
            "platform": payload.platform
        },
        on_conflict="user_id, token"
    ).execute()

    logger.info("device registered %s", profile.data["email"])
    return {"ok", True}