import jwt
from fastapi import HTTPException, status
from app.config import settings

# Fetch and cache public signing keys from Supabase's JWKS endpoint
jwks_client = jwt.PyJWKClient(settings.supabase_jwks_url, cache_keys=True)


def verify_supabase_jwt(token: str) -> dict:
    """Verify the Supabase JWT using asymmetric JWKS keys and return the payload."""
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["ES256", "RS256"],
            audience=settings.supabase_jwt_aud,
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, f"Invalid token: {e}")
