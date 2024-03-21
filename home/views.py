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
        summoner_name, summoner_tag = summoner_name_tag.split("#")
        print(summoner_name + summoner_tag)
        return redirect('summoner_detail', region=region, summoner_name=summoner_name, summoner_tag=summoner_tag)
    