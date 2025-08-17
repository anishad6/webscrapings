# from django.urls import path
# from .views import ping,scrape

# urlpatterns = [
#     path('ping/', ping, name='ping'),
#     path('scrape/', scrape, name='scrape'),
# ]

# from django import views
# from django.contrib import admin
# from django.urls import path, include
# from authentication.views import google_login, logout_view, check_auth
# from api.views import scrape_news
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path('csrf_token/', views.csrf_token_view),
#     path('auth/login/google/', google_login, name='google_login'),
#     path('auth/logout/', logout_view, name='logout'),
#     path('auth/check/', check_auth, name='check_auth'),
#     path('api/scrape/', scrape_news, name='scrape_news'),
#     path('auth/', include('social_django.urls', namespace='social')),
# ]


# api/urls.py
from django.urls import path,include
from authentication.views import google_login, logout_view, check_auth,google_auth
from .views import scrape_news, csrf_token_view

urlpatterns = [
    path('csrf/', csrf_token_view, name='csrf_token'),
    path('scrape/', scrape_news, name='scrape_news'),
    path('auth/login/google/', google_login, name='google_login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/check/', check_auth, name='check_auth'),
    path("auth/google/", google_auth, name="google_auth"),
    path('auth/', include('social_django.urls', namespace='social')),
]