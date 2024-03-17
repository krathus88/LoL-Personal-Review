from django.shortcuts import render
import requests
import os 
from utilFunctions import functions


# Create your views here.
def home_page(request):
    api_request= functions.url_find_summoner("europe", "Hide on bush", "QYBB")
    api_result = requests.get(api_request)
    print (api_result)
    return render(request, "landingPage.html")
