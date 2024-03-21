from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST


def home_page(request):
    return render(request, "landingPage.html")

def submit_summoner(request):
    if request.method == 'GET':
        region = request.GET['region']
        summoner_name = request.GET['summoner_name']
        summoner_tag = request.GET['summoner_tag']
        print(summoner_name + summoner_tag)
        return redirect('summoner_detail', region=region, summoner_name=summoner_name, summoner_tag=summoner_tag)

def submit_summoner_header(request):
    if request.method == 'GET':
        region = request.GET['region']
        summoner_name_tag = request.GET['summoner_name']

        if summoner_name_tag.count("#") > 1: #there is more than one # in summoner name
            return redirect('home_page')

        if summoner_name_tag.find("#") == -1: #there is no # in summoner name
            return redirect('home_page')
        summoner_name, summoner_tag = summoner_name_tag.split("#")

        if len(summoner_tag) == 0: #there is no summoner tag
            return redirect('home_page')
        
        return redirect('summoner_detail', region=region, summoner_name=summoner_name, summoner_tag=summoner_tag)
    