# api/scraping.py
import requests
from bs4 import BeautifulSoup
from urllib.robotparser import RobotFileParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@csrf_exempt
def scrape_news(request):
    permission_classes = [AllowAny] 
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    base_url = 'https://www.bbc.com'
    robots_url = f"{base_url}/robots.txt"
    news_url = f"{base_url}/news"
    
    try:
        # Check robots.txt
        rp = RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        
        if not rp.can_fetch("*", news_url):
            return JsonResponse({'error': 'Scraping not allowed by robots.txt'}, status=403)
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(news_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = []
        
        for article in soup.select('div[data-entityid="container-top-stories#1"] li[class^="gs-o-media"]'):
            title = article.find('h3')
            link = article.find('a')
            summary = article.find('p')
            
            if title and link:
                articles.append({
                    'title': title.text.strip(),
                    'url': f"{base_url}{link['href']}" if link['href'].startswith('/') else link['href'],
                    'summary': summary.text.strip() if summary else '',
                })
                
        return JsonResponse({'articles': articles[:10]}, status=200)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


'''
WORKING PROJECT 

from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

def scrape_bbc_news():
    base_url = 'https://www.bbc.com'
    robots_url = f"{base_url}/robots.txt"
    news_url = f"{base_url}/news"
    
    # Check robots.txt
    rp = RobotFileParser()
    rp.set_url(robots_url)
    rp.read()
    
    if not rp.can_fetch("*", news_url):
        return []
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(news_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = []
        
        for article in soup.select('div[data-entityid="container-top-stories#1"] li[class^="gs-o-media"]'):
            title = article.find('h3')
            link = article.find('a')
            summary = article.find('p')
            
            if title and link:
                articles.append({
                    'title': title.text.strip(),
                    'url': f"{base_url}{link['href']}" if link['href'].startswith('/') else link['href'],
                    'summary': summary.text.strip() if summary else '',
                })
                
        return articles[:10]  # Limit to 10 articles
        
    except Exception as e:
        print(f"Scraping error: {e}")
        return []
'''
'''import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from urllib import robotparser

USER_AGENT = "Mozilla/5.0 (compatible; ScraperBot/1.0; +https://example.com/bot)"

def is_allowed_by_robots(target_url: str, user_agent: str = USER_AGENT) -> bool:
    """Return True if robots.txt allows fetching target_url."""
    try:
        parsed = urlparse(target_url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        rp = robotparser.RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(user_agent, target_url)
    except Exception:
        # If robots.txt cannot be read, be conservative and disallow
        return False

def extract_headlines_from_html(html_text: str, base_url: str = ""):
    """Try multiple selectors to extract headline-like items from arbitrary pages."""
    soup = BeautifulSoup(html_text, "html.parser")
    items = []

    # 1) h1, h2, h3
    for tag in soup.find_all(['h1','h2','h3']):
        text = tag.get_text(strip=True)
        if text:
            items.append({"title": text, "source": "heading"})

    # 2) anchor elements that look like article links (common heuristics)
    for a in soup.find_all('a', href=True):
        text = a.get_text(strip=True)
        href = a['href']
        if text and len(text) > 20:  # heuristics: anchor text long enough
            items.append({"title": text, "url": href, "source": "link"})

    # 3) deduplicate and limit
    dedup = []
    seen = set()
    for it in items:
        key = it.get('title')
        if not key:
            continue
        if key in seen:
            continue
        seen.add(key)
        dedup.append(it)
        if len(dedup) >= 30:
            break

    return dedup

def scrape_url(target_url: str, timeout: int = 10):
    """Main entry: check robots, request page, parse, return items and metadata."""
    result = {"ok": False, "items": [], "fetched_at": int(time.time())}
    if not target_url:
        result["error"] = "No URL provided"
        return result

    # check robots.txt
    if not is_allowed_by_robots(target_url):
        result["error"] = "Disallowed by robots.txt"
        return result

    headers = {"User-Agent": USER_AGENT}
    try:
        resp = requests.get(target_url, headers=headers, timeout=timeout)
        resp.raise_for_status()
    except requests.RequestException as e:
        result["error"] = f"Request error: {e}"
        return result

    items = extract_headlines_from_html(resp.text, base_url=target_url)
    result.update({"ok": True, "items": items, "count": len(items), "fetched_at": int(time.time())})
    return result

'''
'''
import os
# from time import time
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from urllib import robotparser

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"


def is_allowed_by_robots(target_url: str, user_agent: str = USER_AGENT) -> bool:
    parsed = urlparse(target_url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    rp = robotparser.RobotFileParser()
    try:
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(user_agent, target_url)
    except Exception:
        # If robots.txt cannot be fetched, act conservatively
        return False


def scrape_hn(target_url: str):
    headers = {"User-Agent": USER_AGENT}

    if not is_allowed_by_robots(target_url):
        return {
            "ok": False,
            "error": f"Scraping disallowed by robots.txt for {target_url}",
            "items": []
        }

    try:
        resp = requests.get(target_url, headers=headers, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        return {"ok": False, "error": str(e), "items": []}

    soup = BeautifulSoup(resp.text, 'html.parser')

    # Hacker News: titles are in <a class="titlelink"> (newer) or .storylink (older)
    items = []
    for a in soup.select('a.titlelink, a.storylink'):
        title = a.get_text(strip=True)
        href = a.get('href')
        if title and href:
            items.append({"title": title, "url": href})
        if len(items) >= 30:
            break

    fetched_at = int(time.time())
    return {"ok": True, "items": items, "count": len(items), "fetched_at": fetched_at}


def run_scrape():
    target_url = os.environ.get("SCRAPE_URL", "https://news.ycombinator.com/")
    return scrape_hn(target_url)'''