from django.shortcuts import redirect
from django.contrib.auth import logout
from django.http import JsonResponse


from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def google_auth(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get("credential")
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                "126474618620-l23p7893eu8uprgcfcuon1fsqvl1087g.apps.googleusercontent.com"
            )
            
            email = idinfo["email"]
            name = idinfo.get("name", email.split("@")[0])
            user, created = User.objects.get_or_create(
                username=email, 
                defaults={"email": email, "first_name": name}
            )
            login(request, user)
            
            return JsonResponse({"status": "success", "email": email, "name": name})
        
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request"}, status=405)


def google_login(request):
    """
    Redirects to Google OAuth login flow.
    """
    return redirect('/auth/login/google-oauth2/')

def logout_view(request):
    """
    Logs out the current user.
    """
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

def check_auth(request):
    """
    Checks if the user is authenticated.
    """
    if request.user.is_authenticated:
        return JsonResponse({
            'authenticated': True,
            'username': request.user.username,
            'email': request.user.email,
        })
    return JsonResponse({'authenticated': False})
