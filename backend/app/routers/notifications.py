from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.deps import current_user
from app.supabase_client import supabase_admin
from app.push import send_push

router = APIRouter(prefix='/messages', tags=['notifications'])

class NotifyIn(BaseModel): 
    chat_id: str
    message_id: str

@router.post('notify')
async def notify(payload: NotifyIn, user_id: str = Depends(current_user)):

    # confirm the message and sender 
    message = (
        supabase_admin.table("messages")
        .select("id, sender_id, chat_id, message_type")
        .eq("id", payload.message_id)
        .eq("chat_id", payload.chat_id)
        .single()
        .execute()
    )
    if not message.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")
    if message.data["sender_id"] != user_id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not the sender")

    # senders handle
    sender = (
        supabase_admin.table("profiles")
        .select("display_name")
        .eq("id", user_id)
        .single()
        .execute()
    )
    sender_name = sender.data["display_name"] if sender.data else "Someone"

    # recipients
    members= (
        supabase_admin.table("chat_members")
        .select("user_id")
        .eq("chat_id", payload.chat_id)
        .execute()
    ).data or []
    recipient_ids = [m["user_id"] for m in members if m["user_id"] != user_id]
    if not recipient_ids:
        return {"ok": True, "sent": 0}

    # push tokens
    tokens = (
        supabase_admin.table("push_tokens")
        .select("token")
        .in_("user_id", recipient_ids)
        .execute()
    ).data or []

    # preview not actual content
    preview = {
        "text": "New message",
        "image": "New photo",
        "voice": "New voice message"
    }.get(message.data["message_type"], "New message")

    sent = send_push(
        tokens=[t["token"] for t in tokens],
        title=sender_name,
        body=preview,
        data={"chat_id": payload.chat_id, "message_id": payload.message_id}
    )
    return {"ok": True, "sent": sent}