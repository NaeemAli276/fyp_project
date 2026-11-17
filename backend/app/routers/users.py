from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.deps import current_user
from app.supabase_client import supabase_admin

router = APIRouter(prefix="/users", tags=["users"])

class MeOut(BaseModel):
    id: str
    email: str
    display_name: str
    avatar_url: str


@router.get('/me', response_model=MeOut)
async def get_me(user_id: str = Depends(current_user)):
    """ Return the current users profile, including their email """
    result = (
        supabase_admin.table("profiles")
        .select("id, email, display_name, avatar_url")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")
    return result.data