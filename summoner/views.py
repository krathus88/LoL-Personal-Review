from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Player, PlayerAdditionalInfo
from globals import functions
import requests

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    try:
        if (region and summoner_name and summoner_tag): # if all 3 inputs were given properly
            player = Player.find_db(region, summoner_name, summoner_tag) # DB table 1
            accountInfo = None
            
            if player: # if player found in db
                playerAdditionalInfo = PlayerAdditionalInfo.find_db(player.id) # DB table 2
                
                # Organize Data
                accountInfo = functions.organize_summoner_data(player.server, player.summoner_name, player.summoner_tag, playerAdditionalInfo.level, playerAdditionalInfo.summoner_icon)
                
                apiRequestRankedData = functions.find_ranked_data(region, playerAdditionalInfo.summoner_id) # API call
                
            else: # if player NOT found in db
                apiRequestAccount = functions.find_account(summoner_name, summoner_tag) # API call | Matches DB table 1
                
                apiRequestAccountId = functions.find_account_id(region, apiRequestAccount["puuid"]) # API call | Insert in DB table 2
                
                # Add Player to DB 
                Player.add_to_db(apiRequestAccount['puuid'], region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId) 
                
                # Organize Data
                accountInfo = functions.organize_summoner_data(region, apiRequestAccount["gameName"], apiRequestAccount["tagLine"], apiRequestAccountId["summonerLevel"], apiRequestAccountId["profileIconId"])
                
                apiRequestRankedData = functions.find_ranked_data(region, apiRequestAccountId["id"]) # API call

            # Fetch Match History
            match_history = functions.find_match_history("0", "10", player.puuid)
            matches_data = functions.find_match_data(match_history)
            
            organizedRankedData = functions.organize_summoner_ranked_data(apiRequestRankedData)
            
            winRate = functions.calculate_winrate(organizedRankedData)
            
            game_version = requests.get("https://ddragon.leagueoflegends.com/api/versions.json").json()[0]
            
            return render(request, "summoner.html", {'game_version': game_version, 'region': region, 'account_info': accountInfo, 'ranked_info': organizedRankedData, 'win_rate': winRate, 'matches_data': matches_data})

    except Exception as e:
        if int(e.args[0]) == 404: # summoner not found
            return JsonResponse({'message': 'No results found'})

        return render(request, "error.html", {'message': functions.map_error_to_message(int(e.args[0]))})