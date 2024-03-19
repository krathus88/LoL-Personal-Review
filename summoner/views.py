from django.shortcuts import render
import requests
from home.models import Player, PlayerAdditionalInfo
from utilFunctions import functions

# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    """ apiRequestAccount_id = {'id': 'W4UN4K1EBM9Z5bwq-bi3GxjzAWkV0cZML82xO_CJKZcUUgQlgUyEmfY_oA', 'accountId': 'W_ACgJ6gQ2HVN8IlFZWP47g1GKiCdD2ptvwlEDk3YjjcvX6jKrCeO4JR', 'puuid': 'zg0VKVH_rKavkVZ_KYMuyRL74K01S63bq5fxtm0OnC_Iiq4nYxYWSVG8ISX05J8paViq0d9JaLYeWA', 'name': 'Kräthus', 'profileIconId': 5840, 'revisionDate': 1710803923820, 'summonerLevel': 120}
    apiRequestSummoner = [{'leagueId': '47860ea6-f2b8-4518-84b5-bd41df02b13b', 'queueType': 'RANKED_SOLO_5x5', 'tier': 'EMERALD', 'rank': 'IV', 'summonerId': 'W4UN4K1EBM9Z5bwq-bi3GxjzAWkV0cZML82xO_CJKZcUUgQlgUyEmfY_oA', 'summonerName': 'Kräthus', 'leaguePoints': 85, 'wins': 9, 'losses': 13, 'veteran': False, 'inactive': False, 'freshBlood': False, 'hotStreak': True}, {'leagueId': 'a725e136-8140-4d78-9bcd-636bb62efc67', 'queueType': 'RANKED_FLEX_SR', 'tier': 'EMERALD', 'rank': 'IV', 'summonerId': 'W4UN4K1EBM9Z5bwq-bi3GxjzAWkV0cZML82xO_CJKZcUUgQlgUyEmfY_oA', 'summonerName': 'Kräthus', 'leaguePoints': 48, 'wins': 24, 'losses': 26, 'veteran': False, 'inactive': False, 'freshBlood': False, 'hotStreak': True}]"""
    if (region and summoner_name and summoner_tag):
        player = Player.find_db(region, summoner_name, summoner_tag)
        if not player:
            apiRequestAccount = functions.find_account(region, summoner_name, summoner_tag)
            apiRequestAccount_id = functions.find_account_id(region, apiRequestAccount["puuid"])
            print("apiRequestAccount_id:", apiRequestAccount_id)
            apiRequestSummoner = functions.find_summoner(region, apiRequestAccount_id["id"])
            print("api_request_3:", apiRequestSummoner)
            new_player = Player()
            new_player.add_to_db(apiRequestAccount['puuid'], region, summoner_name, summoner_tag, apiRequestAccount_id)
            return render(request, "summoner.html", {'region': region, 'account_info': apiRequestAccount_id,'summoner_info': apiRequestSummoner})
        playerAdditionalInfo = PlayerAdditionalInfo.find_db(player.id)
        print("AAAAAAAAAAAAAAAAA",playerAdditionalInfo.level)
        return(request,"summoner.html", {'region': region, 'account_info': apiRequestAccount_id,'summoner_info': apiRequestSummoner})
