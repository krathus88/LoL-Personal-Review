from django.views.decorators.cache import cache_page
from ninja import Router
from ninja.decorators import decorate_view
from ninja.errors import HttpError
from .models import Player, PlayerAdditionalInfo
from globals import functions, dictionary, exceptions

router = Router()


@router.get("/")
@decorate_view(cache_page(5 * 60))  # Cache response for 5 minutes
def summoner_detail(request, region: str, summoner_name: str, summoner_tag: str):
    try:
        if region and summoner_name and summoner_tag:
            player = Player.find(region, summoner_name, summoner_tag)  # DB table 1
            summoner_info = None
            if player:  # if player found in db
                player_additional_info = PlayerAdditionalInfo.find(
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

                api_request_summoner = functions.find_summoner(
                    region, api_request_account["puuid"]
                )  # Matches DB table 2

                # add player to DB
                player = Player.objects.create(
                    puuid=api_request_account["puuid"],
                    server=region,
                    summoner_name=api_request_account["gameName"],
                    summoner_tag=api_request_account["tagLine"],
                )

                PlayerAdditionalInfo.objects.create(
                    id=player,
                    summoner_id=api_request_summoner["id"],
                    account_id=api_request_summoner["accountId"],
                    level=api_request_summoner["summonerLevel"],
                    summoner_icon=api_request_summoner["profileIconId"],
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
                "puuid": player.puuid,
                "region": region,
                "summoner_info": summoner_info,
                "ranked_info": organized_ranked_data,
            }

    except exceptions.RiotAPI as e:
        raise HttpError(
            e.status_code,
            "Riot API error occurred.",  # Default message
        )


@router.get("/match-history/")
@decorate_view(cache_page(15 * 60))  # Cache response for 15 minutes
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
            if player_match is not None
            and match
            is not None  # Makes it so it doesnt return value on only one of the variables
        ]

        return combined_data
    except exceptions.RiotAPI as e:
        raise HttpError(
            e.status_code,
            "Riot API error occurred.",  # Default message
        )


@router.patch("/")
def update_button(
    request,
    region: str,
    lastMatch: str,
    puuid: str,
):
    api_request_account = functions.find_account_puuid(puuid)
    player = Player.find(puuid)
    # check for rename
    if (
        api_request_account["gameName"] != player.summoner_tag
        or api_request_account["tagLine"] != player.summoner_tag
    ):
        # changed info in the DB
        player.summoner_name = api_request_account["gameName"]
        player.summoner_tag = api_request_account["tagLine"]
        player.save()

    # updates general summoner info
    api_request_summoner = functions.find_summoner(region, api_request_account["puuid"])
    player_info = PlayerAdditionalInfo.find(player.id)
    player_info.level = (api_request_summoner["summonerLevel"],)
    player_info.summoner_icon = (api_request_summoner["profileIconId"],)
    player_info.save()

    summoner_info = {
        player.summoner_name,
        player.summoner_tag,
        player_info.level,
        player_info.summoner_icon,
    }

    api_request_ranked_data = functions.find_ranked_data(
        region, player_info.summoner_id
    )

    ranked_data = functions.organize_summoner_ranked_data(api_request_ranked_data)

    # get the new matches
    match_history = functions.find_match_history(region, "0", "10", puuid)
    if lastMatch in match_history:
        new_matches = match_history.find(lastMatch)
    else:
        new_matches = 10

    runes_data, items_data, matches_data = functions.find_match_data_general(
        region, match_history[:new_matches]
    )

    player_match_data = functions.filter_player_match_data(
        matches_data, runes_data, items_data, puuid
    )

    combined_data = [
        {"player_match": player_match, "match": match}
        for player_match, match in zip(player_match_data, matches_data)
        if player_match is not None
        and match
        is not None  # Makes it so it doesnt return value on only one of the variables
    ]
    return {
        "summoner_info": summoner_info,
        "ranked_info": ranked_data,
        "matches": combined_data,
    }


@router.get("/match-overview")
def update_summoner_match(request):
    team_blue_html = "Hello"
    team_red_html = "Bye"

    new_information = {
        "team_blue_html": team_blue_html,
        "team_red_html": team_red_html,
    }
    return {new_information}
