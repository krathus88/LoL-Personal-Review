from django.shortcuts import render
from .models import Player, PlayerAdditionalInfo
from globals import functions
import requests

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    if (region and summoner_name and summoner_tag): # if all 3 inputs were given properly
        player = Player.find_db(region, summoner_name, summoner_tag) # DB table 1
        accountInfo = None
        
        if player: # if player found in db
            playerAdditionalInfo = PlayerAdditionalInfo.find_db(player.id) # DB table 2
            
            # Organize Data
            accountInfo = functions.organize_summoner_data(player.server, player.summoner_name, player.summoner_tag, playerAdditionalInfo.level, playerAdditionalInfo.summoner_icon)
            
            apiRequestSummoner = functions.find_summoner(region, playerAdditionalInfo.summoner_id) # API call
            if(type(apiRequestSummoner) == int): # API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestSummoner)})
            
        else: # if player NOT found in db
            apiRequestAccount = functions.find_account(region, summoner_name, summoner_tag) # API call | Insert in DB table 1
            if (type(apiRequestAccount) == int): # API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestAccount)})
            
            apiRequestAccountId = functions.find_account_id(region, apiRequestAccount["puuid"]) # API call | Insert in DB table 2
            if(type(apiRequestAccountId) == int): # API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestAccountId)})
            
            # Add Player to DB 
            Player.add_to_db(apiRequestAccount['puuid'], region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId) 
            
            # Organize Data
            accountInfo = functions.organize_summoner_data(region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId["summonerLevel"], apiRequestAccountId["profileIconId"])
            
            # 
            apiRequestSummoner = functions.find_summoner(region, apiRequestAccountId["id"]) # API call
            if(type(apiRequestSummoner) == int): # API call failed
                return render(request, "error.html", {'message' : functions.map_error_to_message(apiRequestSummoner)})
        
        organizedRankedData = functions.organize_summoner_ranked_data(apiRequestSummoner)
        winRate = functions.calculate_winrate(organizedRankedData)
        game_version = requests.get("https://ddragon.leagueoflegends.com/api/versions.json").json()[0]
        
        return render(request, "summoner.html", {'game_version': game_version, 'region': region, 'account_info': accountInfo,'ranked_info': organizedRankedData, 'win_rate': winRate})
