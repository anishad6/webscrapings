# from django.shortcuts import render

# # Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import logout
from django.shortcuts import redirect

from django.http import JsonResponse

# api/views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from .scraping import scrape_news

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

def scrape_news(request):
    # Example stub logic
    data = {
        "headline": "Breaking News",
        "content": "This is a test article scraped successfully!"
    }
    return JsonResponse(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def google_login(request):
    return redirect('social:begin', backend='google-oauth2')

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'status': 'success'})

@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({'authenticated': True, 'user': {
            'email': request.user.email,
            'name': request.user.get_full_name(),
        }})
    return Response({'authenticated': False})


# ------------------------------------------

# from django.shortcuts import redirect
# from django.contrib.auth import logout
# from django.http import JsonResponse

# def google_login(request):
#     """
#     Redirects to Google OAuth login flow.
#     """
#     return redirect('/auth/login/google-oauth2/')

# def logout_view(request):
#     """
#     Logs out the current user.
#     """
#     logout(request)
#     return JsonResponse({'message': 'Logged out successfully'})

# def check_auth(request):
#     """
#     Checks if the user is authenticated.
#     """
#     if request.user.is_authenticated:
#         return JsonResponse({
#             'authenticated': True,
#             'username': request.user.username,
#             'email': request.user.email,
#         })
#     return JsonResponse({'authenticated': False})


'''
import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .scraping import scrape_url
from django.conf import settings

@require_GET
def ping(request):
    return JsonResponse({"status": "ok"})

@csrf_exempt
@require_POST
def scrape(request):
    """
    POST /api/scrape/
    Body JSON: { "url": "https://example.com" }
    Header: Authorization: Bearer <token> (optional)
    """
    try:
        body = json.loads(request.body.decode('utf-8') or "{}")
    except Exception:
        return HttpResponseBadRequest("Invalid JSON")

    url = body.get('url')
    if not url:
        return JsonResponse({"ok": False, "error": "Missing 'url' in request body"}, status=400)

    # Optional: simple check for Authorization header (no verification)
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        # You can relax this in dev, but warn in response
        # For production, verify token server-side (Google ID token verification).
        pass

    result = scrape_url(url)
    status = 200 if result.get('ok') else 400
    return JsonResponse(result, status=status)
'''

'''
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from .scraping import run_scrape


@require_GET
def ping(request):
    return JsonResponse({"status": "ok"})


@csrf_exempt
@require_GET
def scrape(request):
    # In a production app, validate OAuth token from frontend if needed.
    result = run_scrape()
    status = 200 if result.get("ok") else 400
    return JsonResponse(result, status=status)
    
    '''