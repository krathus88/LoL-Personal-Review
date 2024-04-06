from ninja import Router
from ninja.errors import HttpError
from .models import Player, PlayerAdditionalInfo
from globals import functions, dictionary, exceptions

router = Router()


@router.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}


@router.get("/")
def summoner_detail(request, region: str, summoner_name: str, summoner_tag: str):
    try:
        if region and summoner_name and summoner_tag:
            player = Player.find_db(region, summoner_name, summoner_tag)  # DB table 1
            summoner_info = None
            puuid = None
            if player:  # if player found in db
                puuid = player.puuid

                player_additional_info = PlayerAdditionalInfo.find_db(
                    player.id
                )  # DB table 2

                summoner_info = functions.organize_summoner_data(
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
                    region, summoner_name, summoner_tag
                )  # Matches DB table 1

                puuid = api_request_account["puuid"]

                api_request_summoner = functions.find_summoner(
                    region, api_request_account["puuid"]
                )  # Matches DB table 2

                player = Player.add_to_db(
                    api_request_account["puuid"],
                    region,
                    api_request_account["gameName"],
                    api_request_account["tagLine"],
                    api_request_summoner,
                )
                summoner_info = functions.organize_summoner_data(
                    region,
                    api_request_account["gameName"],
                    api_request_account["tagLine"],
                    api_request_summoner["summonerLevel"],
                    api_request_summoner["profileIconId"],
                )

                api_request_ranked_data = functions.find_ranked_data(
                    region, api_request_summoner["id"]
                )

            organized_ranked_data = functions.organize_summoner_ranked_data(
                api_request_ranked_data
            )

            return {
                "puuid": puuid,
                "region": region,
                "summoner_info": summoner_info,
                "ranked_info": organized_ranked_data,
            }

    except exceptions.RiotAPI as e:
        raise HttpError(
            e.status_code,
            f"RIOT API Error: {dictionary.dict_errors_riot_api[e.status_code]}",
        )


@router.get("/match-history/")
def match_history(request, region: str, start: str, end: str, puuid: str):
    try:
        match_history = functions.find_match_history(region, start, end, puuid)

        runes_data, items_data, matches_data = functions.find_match_data_general(
            region, match_history
        )
        player_match_data = functions.filter_player_match_data(
            matches_data, runes_data, items_data, puuid
        )

        combined_data = [
            {"player_match": player_match, "match": match}
            for player_match, match in zip(player_match_data, matches_data)
        ]

        return combined_data
    except exceptions.RiotAPI as e:
        raise HttpError(
            e.status_code,
            f"RIOT API Error: {dictionary.dict_errors_riot_api[e.status_code]}",
        )


@router.get("/match-overview")
def update_summoner_match(request):
    team_blue_html = "Hello"
    team_red_html = "Bye"

    new_information = {
        "team_blue_html": team_blue_html,
        "team_red_html": team_red_html,
    }
    return {new_information}
