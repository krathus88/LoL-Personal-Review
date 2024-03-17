from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import requests
import os 
from utilFunctions import functions


def home_page(request):
    api_request= functions.url_find_summoner("europe", "Hide on bush", "QYBB")
    api_result = requests.get(api_request)
    print (api_result)

    message = request.session.pop('message', None)  # Retrieve and remove message from session
    return render(request, "landingPage.html", {'message': message})


@require_POST
def submit_summoner_name(request):
    summoner_name = request.POST.get('summoner_name')
    print("summoner_name:" + summoner_name)
    if summoner_name:
        message = f"Summoner name = {summoner_name}"
    else:
        message = 'Invalid request method'
    request.session['message'] = message
    return redirect('home_page')
