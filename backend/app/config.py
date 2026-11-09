from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    # supabase
    superbase_url: str
    supabase_service_role_key: str
    supabase_jwt_secret: str
    supabase_jwt_aud: str = "authenticated"

    # push
    expo_push_url: str = "http://exp.host/--/api/v2/push/send"

    enviroment: str = "developement"

settings = Settings()