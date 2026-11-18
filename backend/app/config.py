from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_FILE = Path(__file__).resolve().parent.parent / ".env"  # backend/.env

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_FILE, extra="ignore")

    supabase_url: str
    supabase_service_role_key: str
    supabase_jwt_secret: str
    supabase_jwt_aud: str = "authenticated"

    expo_push_url: str = "http://exp.host/--/api/v2/push/send"

    environment: str = "development"

settings = Settings()