import logging
import httpx
from app.config import settings

logger = logging.getLogger(__name__)

def send_push(tokens: list[str], title: str, body: str, data: dict | None = None):

    # send a push using expo, Returns the number of queued notifications

    if not tokens: 
        return 0

    valid: list[str] = [t for t in tokens if t.startswith("ExponentPushToken[")]
    if not valid:
        logger.warning("no valid Expo tokens in %d tokens", len(tokens))
        return 0

    messages = [
        {
            "to": token,
            "title": title,
            "body": body,
            "data": data or {},
            "sound": "default",
            "priority": "high"
        }
        for token in valid
    ]

    try: 

        with httpx.Client(timeout=10.0) as client:
            resp = client.post(
                settings.expo_push_url,
                json=messages,
                headers={
                    "Content-type": "application/json"
                }
            )
            resp.raise_for_status()
            result = resp.json().get("data", [])
            sent = sum(1 for r in result if r.get("status"))
            logger.info("expo push: $d ok / %d total", sent, len(valid))
            return sent

    except Exception as e: 
        logger.exception("expo push failed: %s", e)
        return 0