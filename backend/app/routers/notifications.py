from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.deps import current_user
from app.supabase_client import supabase_admin
from app.push import send_push

router = APIRouter(prefix="/messages", tags=["notifications"])


class NotifyIn(BaseModel):
    chat_id: str
    message_id: str


@router.post("/notify")
async def notify(payload: NotifyIn, user_id: str = Depends(current_user)):
    # 1. Confirm the message exists and the caller is the sender
    msg = (
        supabase_admin.table("messages")
        .select("id, sender_id, chat_id, message_type")
        .eq("id", payload.message_id)
        .eq("chat_id", payload.chat_id)
        .single()
        .execute()
    )
    if not msg.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")
    if msg.data["sender_id"] != user_id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not the sender")

    # 2. Chat members
    members = (
        supabase_admin.table("chat_members")
        .select("user_id")
        .eq("chat_id", payload.chat_id)
        .execute()
    ).data or []

    recipients = [m["user_id"] for m in members if m["user_id"] != user_id]
    if not recipients:
        return {"ok": True, "sent": 0}

    # 3. Their push tokens
    tokens = (
        supabase_admin.table("push_tokens")
        .select("token")
        .in_("user_id", recipients)
        .execute()
    ).data or []

    # 4. Generic preview — never leak message content
    preview = {
        "text": "New message",
        "image": "New photo",
        "voice": "New voice message",
    }.get(msg.data["message_type"], "New message")

    sent = send_push(
        tokens=[t["token"] for t in tokens],
        title="New message",
        body=preview,
        data={"chat_id": payload.chat_id, "message_id": payload.message_id},
    )
    return {"ok": True, "sent": sent}