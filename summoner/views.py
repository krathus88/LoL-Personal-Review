from django.shortcuts import render

# Create your views here.
def summoner(request):
    summoner_info = request.session.get('message')
    return render(request, "summoner.html", {'summoner_info': summoner_info})
