from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page

from .models import Player, PlayerAdditionalInfo
from .schemas import SummonerDetailResponse, MatchHistoryResponse, UpdateButtonResponse
from globals.functions import (
    find_ranked_data,
    find_account,
    find_account_puuid,
    find_summoner,
    find_match_history,
    find_match_data_general,
    organize_summoner_ranked_data,
    filter_player_match_data,
    recently_played_with,
)

router = Router()


@router.get("/", response=SummonerDetailResponse)
@decorate_view(cache_page(5 * 60))  # Cache response for 5 minutes
def summoner_detail(request, region: str, summoner_name: str, summoner_tag: str):
    player = Player.find(region, summoner_name, summoner_tag)  # DB table 1
    summoner_info = None
    if player:  # if player found in db
        player_additional_info = PlayerAdditionalInfo.find(player.id)  # DB table 2

        summoner_info = {
            "puuid": player.puuid,
            "region": player.server,
            "name": player.summoner_name,
            "tag": player.summoner_tag,
            "level": player_additional_info.level,
            "iconId": player_additional_info.summoner_icon,
        }

        api_request_ranked_data = find_ranked_data(
            region, player_additional_info.summoner_id
        )

    else:  # if player NOT found in db
        api_request_account = find_account(
            region, summoner_name, summoner_tag
        )  # Matches DB table 1

        api_request_summoner = find_summoner(
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

        summoner_info = {
            "puuid": api_request_account["puuid"],
            "region": region,
            "name": api_request_account["gameName"],
            "tag": api_request_account["tagLine"],
            "level": api_request_summoner["summonerLevel"],
            "iconId": api_request_summoner["profileIconId"],
        }

        api_request_ranked_data = find_ranked_data(region, api_request_summoner["id"])

    organized_ranked_data = organize_summoner_ranked_data(api_request_ranked_data)

    return {
        "summonerInfo": summoner_info,
        "rankedInfo": organized_ranked_data,
    }


@router.get("/match-history/", response=MatchHistoryResponse)
@decorate_view(cache_page(5 * 60))  # Cache response for 5 minutes
def match_history(request, region: str, start: str, num_games: str, puuid: str):
    match_history = find_match_history(region, start, num_games, puuid)

    runes_data, items_data, matches_data = find_match_data_general(
        region, match_history
    )
    matches_data_clean = filter_player_match_data(
        matches_data, runes_data, items_data, puuid
    )

    # If adding more data to the match history
    if int(num_games) < 10:
        return {"matches": matches_data_clean, "recentlyPlayed": None}

    recently_played = recently_played_with(puuid, matches_data)

    return {"matches": matches_data_clean, "recentlyPlayed": recently_played}


@router.patch("/", response=UpdateButtonResponse)
def update_button(
    request,
    region: str,
    lastMatch: str,
    puuid: str,
):
    api_request_account = find_account_puuid(puuid, region)
    player = Player.find_puuid(puuid)

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
    api_request_summoner = find_summoner(region, api_request_account["puuid"])
    player_info = PlayerAdditionalInfo.find(player.id)
    player_info.level = api_request_summoner["summonerLevel"]
    player_info.summoner_icon = api_request_summoner["profileIconId"]
    player_info.save()

    summoner_info = {
        "puuid": player.puuid,
        "region": region,
        "name": player.summoner_name,
        "tag": player.summoner_tag,
        "level": player_info.level,
        "iconId": player_info.summoner_icon,
    }

    api_request_ranked_data = find_ranked_data(region, player_info.summoner_id)

    ranked_data = organize_summoner_ranked_data(api_request_ranked_data)

    # get the new matches
    match_history = find_match_history(region, "0", "10", puuid)
    if lastMatch in match_history:
        new_matches = match_history.index(lastMatch)
    else:
        new_matches = 10

    runes_data, items_data, matches_data = find_match_data_general(
        region, match_history[:new_matches]
    )

    matches_data_clean = filter_player_match_data(
        matches_data, runes_data, items_data, puuid
    )

    recently_played = recently_played_with(puuid, matches_data)

    return {
        "summonerData": {
            "summonerInfo": summoner_info,
            "rankedInfo": ranked_data,
        },
        "matches": matches_data_clean,
        "recentlyPlayed": recently_played,
    }
