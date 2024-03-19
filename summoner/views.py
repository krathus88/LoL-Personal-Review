from django.shortcuts import render
import requests

from utilFunctions import functions

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    if (region and summoner_name and summoner_tag):
        api_request = functions.url_find_summoner(region, summoner_name, summoner_tag)
    return render(request, "summoner.html", {'summoner_info': api_request})
