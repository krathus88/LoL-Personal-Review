from django.shortcuts import render
import requests
from home.models import Player, PlayerAdditionalInfo
from utilFunctions import functions

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    if (region and summoner_name and summoner_tag):
        player = Player.find_db(region, summoner_name, summoner_tag)
        if not player:
            apiRequestAccount = functions.find_account(region, summoner_name, summoner_tag)
            if (type(apiRequestAccount) == dict):
                apiRequestAccount_id = functions.find_account_id(region, apiRequestAccount["puuid"])
                print("apiRequestAccount_id:", apiRequestAccount_id)
                if (type(apiRequestAccount) == dict):
                    apiRequestSummoner = functions.find_summoner(region, apiRequestAccount_id["id"])
                    print("api_request_3:", apiRequestSummoner)
                    new_player = Player()
                    new_player.add_to_db(apiRequestAccount['puuid'], region, summoner_name, summoner_tag, apiRequestAccount_id)
                    return render(request, "summoner.html", {'region': region, 'account_info': apiRequestAccount_id,'summoner_info': apiRequestSummoner})
        playerAdditionalInfo = PlayerAdditionalInfo.find_db(player.id)
        print("AAAAAAAAAAAAAAAAA",playerAdditionalInfo.level)
        return(request,"summoner.html", {'region': region, 'account_info': apiRequestAccount_id,'summoner_info': apiRequestSummoner})
