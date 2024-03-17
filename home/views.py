from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import requests
from utilFunctions import functions


def home_page(request):
    message = request.session.pop('message', None)  # Retrieve and remove message from session
    return render(request, "landingPage.html", {'message': message})


@require_POST
def submit_summoner_name(request):
    region = request.POST.get('region')
    summoner_name = request.POST.get('summoner_name')
    summoner_tag = request.POST.get('summoner_tag')
    
    if (summoner_name and region and summoner_tag):
        api_request = functions.url_find_summoner(region, summoner_name, summoner_tag)
        api_result = requests.get(api_request)
        print(api_result)
        if api_result.status_code == 200:
            # API call successful
            api_result = api_result.json()
            message = api_result
        else:
            # API call failed
            message = f"Failed to retrieve summoner information. Error code: {api_result.status_code}"
    else:
        message = 'Invalid request method'
    request.session['message'] = message
    return redirect('summoner_page')
