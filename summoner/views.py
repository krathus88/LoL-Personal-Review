from django.shortcuts import render
from .models import Player, PlayerAdditionalInfo
from utilFunctions import functions

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    if (region and summoner_name and summoner_tag):
        player = Player.find_db(region, summoner_name, summoner_tag)
        account_info = ""
        if not player:
            apiRequestAccount = functions.find_account(region, summoner_name, summoner_tag)
            
            if (type(apiRequestAccount) != dict): #API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestAccount)})
            
            apiRequestAccountId = functions.find_account_id(region, apiRequestAccount["puuid"])

            if(type(apiRequestAccountId) != dict): #API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestAccountId)})

            account_info = functions.dic_summoner_info(region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId["summonerLevel"], apiRequestAccountId["profileIconId"])
            player = Player.add_to_db(apiRequestAccount['puuid'], region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId)
        playerAdditionalInfo = PlayerAdditionalInfo.find_db(player.id)
        if not account_info:
            account_info = functions.dic_summoner_info(player.server, player.summoner_name, player.summoner_tag, playerAdditionalInfo.level, playerAdditionalInfo.summoner_icon)
        apiRequestSummoner = functions.find_summoner(region, playerAdditionalInfo.summoner_id)

        if(type(apiRequestSummoner) != dict): #API call failed
                print("AAAAAAAAAAAAAAA")
                print(apiRequestSummoner)
                print(functions.map_error_to_message(apiRequestSummoner))
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestSummoner)})

        return render(request, "summoner.html", {'region': region, 'account_info': account_info,'summoner_info': apiRequestSummoner})
    