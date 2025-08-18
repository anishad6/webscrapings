
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# ALLOWED_HOSTS = [h.strip() for h in os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',') if h.strip()]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'social_django',
    'authentication',
    'api',
    # 'django.contrib.sessions',
]

MIDDLEWARE = [
    # "corsheaders.middleware.CorsMiddleware",
    # 'api.middleware.CORPHeadersMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# ALLOWED_HOSTS = ['*'] 
ALLOWED_HOSTS = ['atandace.onrender.com', '127.0.0.1', 'localhost']

# If using session authentication
CORS_ALLOW_CREDENTIALS = True


CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://webscrapingportal.netlify.app",
]


# Session/Cookie Settings
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SECURE = False  # Set True in production
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SECURE = False

# Redirects after login/logout
LOGIN_URL = 'login'
LOGOUT_URL = 'logout'
LOGIN_REDIRECT_URL = '/'   # where to redirect after login
LOGOUT_REDIRECT_URL = '/'  # after logout


ROOT_URLCONF = 'scraper_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ]},
    },
]

WSGI_APPLICATION = 'scraper_backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'scraper',       
        'USER': 'root',        
        'PASSWORD': 'Abhishek@12345',
        'HOST': 'localhost',
                        
    }
}
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',  # example for Google
    'django.contrib.auth.backends.ModelBackend',
)


AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

# ALLOWED_HOSTS = ['atandace.onrender.com', '127.0.0.1', 'localhost']

# FRONTEND_ORIGINS = [o.strip() for o in os.environ.get('FRONTEND_ORIGINS', 'http://localhost:3000').split(',') if o.strip()]
# CORS_ALLOWED_ORIGINS = FRONTEND_ORIGINS
# CORS_ALLOW_CREDENTIALS = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




