from supabase import create_client, Client
from app.config import settings

supabase_admin: Client = create_client(
    settings.superbase_url,
    settings.supabase_service_role_key
)