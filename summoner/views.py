from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Player, PlayerAdditionalInfo
from globals import functions, dictionary
import requests


# Create your views here.
def summoner_detail(request, region, summoner_name, summoner_tag):
    try:
        if region and summoner_name and summoner_tag:
            player = Player.find_db(region, summoner_name, summoner_tag)  # DB table 1
            account_info = None
            if player:  # if player found in db
                player_additional_info = PlayerAdditionalInfo.find_db(
                    player.id
                )  # DB table 2

                account_info = functions.organize_summoner_data(
                    player.server,
                    player.summoner_name,
                    player.summoner_tag,
                    player_additional_info.level,
                    player_additional_info.summoner_icon,
                )

                api_request_ranked_data = functions.find_ranked_data(
                    region, player_additional_info.summoner_id
                )
            else:  # if player NOT found in db
                api_request_account = functions.find_account(
                    summoner_name, summoner_tag
                )  # Matches DB table 1
                print("api_request_account:", api_request_account)

                api_request_account_id = functions.find_summoner(
                    region, api_request_account["puuid"]
                )  # Matches DB table 2
                print("api_request_account_id:", api_request_account_id)

                # Add Player to DB
                Player.add_to_db(
                    api_request_account["puuid"],
                    region,
                    api_request_account["gameName"],
                    api_request_account["tagLine"],
                    api_request_account_id,
                )

                # Organize Data
                account_info = functions.organize_summoner_data(
                    region,
                    api_request_account["gameName"],
                    api_request_account["tagLine"],
                    api_request_account_id["summonerLevel"],
                    api_request_account_id["profileIconId"],
                )

                api_request_ranked_data = functions.find_ranked_data(
                    region, api_request_account_id["id"]
                )  # API call

            # Fetch Match History
            match_history = functions.find_match_history("0", "10", player.puuid)
            matches_data = functions.find_match_data_general(match_history)

            organized_ranked_data = functions.organize_summoner_ranked_data(
                api_request_ranked_data
            )

            win_rate = functions.calculate_winrate(organized_ranked_data)

            game_version = requests.get(
                "https://ddragon.leagueoflegends.com/api/versions.json"
            ).json()[0]

            return render(
                request,
                "summoner.html",
                {
                    "game_version": game_version,
                    "region": region,
                    "account_info": account_info,
                    "ranked_info": organized_ranked_data,
                    "win_rate": win_rate,
                    "matches_data": matches_data,
                },
            )

    except Exception as e:
        if int(e.args[0]) == 404:  # summoner not found
            return JsonResponse({"message": "No results found"})

        return render(
            request,
            "error.html",
            {
                "message": "RIOT API Error: "
                + dictionary.dict_errors_riot_api(int(e.args[0]))
            },
        )
