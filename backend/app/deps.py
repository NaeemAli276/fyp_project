from fastapi import Depends, Header, HTTPException, status
from app.auth import verify_supabase_jwt

async def current_user(authorization: str = Header(...)) -> str:
    """
    Extract and verify the Bearer token. Returns the user's UUID.
    Use as a dependency on any protected route.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Missing Bearer token")

    token = authorization.removeprefix("Bearer ").strip()
    payload = verify_supabase_jwt(token)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Token missing 'sub'")
    return user_id