from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.deps import current_user
from app.supabase_client import supabase_admin

router = APIRouter(tags=["moderation"])

# ---------- Blocking ----------
class BlockIn(BaseModel):
    blocked_user_id: str

@router.post("/users/block")
async def block_user(payload: BlockIn, user_id: str = Depends(current_user)):
    supabase_admin.table("blocks").upsert({
        "blocker_id": user_id,
        "blocked_id": payload.blocked_user_id,
    }).execute()
    return {"ok": True}

# ---------- Add group member ----------
class AddMemberIn(BaseModel):
    user_id: str

@router.post("/chats/{chat_id}/members")
async def add_member(
    chat_id: str,
    payload: AddMemberIn,
    user_id: str = Depends(current_user),
):
    # Confirm caller is in the chat
    membership = (
        supabase_admin.table("chat_members")
        .select("user_id")
        .eq("chat_id", chat_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not membership.data:
        from fastapi import HTTPException, status
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not a chat member")

    supabase_admin.table("chat_members").upsert({
        "chat_id": chat_id,
        "user_id": payload.user_id,
    }).execute()
    return {"ok": True}