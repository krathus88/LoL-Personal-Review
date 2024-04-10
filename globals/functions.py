import os
import aiohttp
import asyncio
import requests
from datetime import datetime
from globals import dictionary, exceptions


def find_account(region, summoner_name, tag):
    """Returns a Dictionary

    Gets Player's Account information (retrieves PUUID).
    """
    try:
        api_url = os.getenv("API_URL").replace(
            "[server]", dictionary.dict_region[region]
        )
        endpoint_url = (
            os.getenv("ACCOUNT_SEARCH")
            .replace("[gameName]", summoner_name)
            .replace("[tagLine]", tag)
        )
        print(api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY"))
        api_result = requests.get(
            api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
        )
        api_result.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return api_result.json()
    except requests.exceptions.RequestException as e:
        raise exceptions.RiotAPI(api_result.status_code)


def find_summoner(server, puuid):
    """Returns a Dictionary

    Gets Summoner's Account information"""
    try:
        api_url = os.getenv("API_URL").replace(
            "[server]", dictionary.dict_server[server]
        )
        endpoint_url = os.getenv("SUMMONER_SEARCH").replace("[encryptedPUUID]", puuid)
        api_result = requests.get(
            api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
        )
        api_result.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return api_result.json()
    except requests.exceptions.RequestException as e:
        raise exceptions.RiotAPI(api_result.status_code)


def find_ranked_data(server, summoner_id):
    """Returns a List with 2 Dictionaries

    Provides Ranked stats for a given player (by Id). Information must
    then be parsed by organize_summoner_ranked_data() to structure it correctly."""
    try:
        api_url = os.getenv("API_URL").replace(
            "[server]", dictionary.dict_server[server]
        )
        endpoint_url = os.getenv("RANKED_SEARCH").replace(
            "[encryptedSummonerId]", summoner_id
        )
        api_result = requests.get(
            api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
        )
        api_result.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return api_result.json()
    except requests.exceptions.RequestException as e:
        raise exceptions.RiotAPI(api_result.status_code)


def find_match_history(region, start_count, num_games, puuid):
    """Returns a List

    Provides the match history (matchIds) of a given summoner (by PUUID).
    Choose on what index to start and how many matches to filter."""
    try:
        api_url = os.getenv("API_URL").replace(
            "[server]", dictionary.dict_region[region]
        )
        endpoint_url = (
            os.getenv("SUMMONER_MATCH_HISTORY_SEARCH").replace(
                "[encryptedPUUID]", puuid
            )
        ) + f"?start={start_count}&count={num_games}"

        api_result = requests.get(
            api_url + endpoint_url + "&api_key=" + os.getenv("API_KEY")
        )
        api_result.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return api_result.json()
    except requests.exceptions.RequestException as e:
        raise exceptions.RiotAPI(api_result.status_code)


def find_match_data_general(region, matches):
    """Returns a List of Dictionaries

    Provides GENERAL information about a given match for all players.

    Accepts multiple matches in a singe List."""

    urls = []

    urls.append(
        "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json"
    )

    urls.append(
        "https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json"
    )

    api_url = os.getenv("API_URL").replace("[server]", dictionary.dict_region[region])
    for match in matches:
        endpoint_url = os.getenv("SUMMONER_MATCH_SEARCH_GENERAL").replace(
            "[match]", match
        )
        urls.append(api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY"))

    results = asyncio.run(main(urls))

    return results[0], results[1], results[2:]


def recently_played_with(puuid, matches):
    """Returns a Dictionary

    Returns the recently played with players."""
    
    players_stats = {}

    for match in matches:
        player_index = match["metadata"]["participants"].index(puuid)
        player_team = match["info"]["participants"][player_index]["teamId"]

        for participant in match["info"]["participants"]:
            if participant["puuid"] != puuid and participant["teamId"] == player_team:
                name_tag = (
                    f"{participant["riotIdGameName"]}#{participant["riotIdTagline"]}"
                )
                # Update games played together
                if name_tag in players_stats:
                    players_stats[name_tag]["games_played"] += 1
                else:
                    players_stats[name_tag] = {
                        "profileIcon": participant["profileIcon"],
                        "games_played": 1,
                        "wins": 0,
                    }
                # Update wins and defeats
                if participant["win"]:
                    players_stats[name_tag]["wins"] += 1

    # Calculate winrate and remove entries with less than 2 games played
    players_stats_filtered = {}
    for name_tag, stats in players_stats.items():
        if stats["games_played"] >= 2:
            stats["winrate"] = round((stats["wins"] / stats["games_played"]) * 100)
            players_stats_filtered[name_tag] = stats

    return players_stats_filtered


def organize_summoner_data(
    region, summoner_name, summoner_tag, summoner_level, summoner_icon
):
    """Returns a Dictionary

    Parses summoner information received from DB/Riot API
    and converts it to a standard format."""

    return {
        "region": region,
        "name": summoner_name,
        "tag": summoner_tag,
        "level": summoner_level,
        "iconId": summoner_icon,
    }


def organize_summoner_ranked_data(summoner_list):
    """Returns a List containing two dictionaries, [SoloQ, FlexQ]

    Parses ranked information received from Riot API
    and converts it to a standard format."""

    solo_queue = {"tier": "unranked"}
    flex_queue = {"tier": "unranked"}

    for input in summoner_list:
        if input["queueType"] == "RANKED_SOLO_5x5":
            solo_queue = input

            solo_queue["winRate"] = round(
                solo_queue["wins"] / (solo_queue["wins"] + solo_queue["losses"]) * 100
            )

        elif input["queueType"] == "RANKED_FLEX_SR":
            flex_queue = input

            flex_queue["winRate"] = round(
                flex_queue["wins"] / (flex_queue["wins"] + flex_queue["losses"]) * 100
            )

    return [solo_queue, flex_queue]


def filter_player_match_data(match_data, runes_data, items_data, puuid):
    """Returns a List of Dictionaries

    Provides GENERAL information about a given match for the player
    (by the given PUUID).

    Accepts multiple matches in a singe List."""

    player_data = []
    for match in match_data:
        if match == None:
            continue
        for participant in match["info"]["participants"]:
            if participant["puuid"] == puuid:
                # Calculates game duration
                game_duration = (
                    match["info"]["gameEndTimestamp"]
                    - match["info"]["gameStartTimestamp"]
                ) / 1000  # Timestamp is in milliseconds
                minutes = int(game_duration // 60)
                seconds = int(game_duration % 60)

                player_data.append(
                    {
                        "puuid": participant["puuid"],
                        "gameMode": dictionary.dict_queue_id[match["info"]["queueId"]],
                        "gameDuration": f"{minutes}m {seconds}s",
                        "timeSinceGameEnd": time_elapsed(
                            match["info"]["gameEndTimestamp"]
                        ),
                        "championId": participant["championId"],
                        "level": participant["champLevel"],
                        "kills": participant["kills"],
                        "deaths": participant["deaths"],
                        "assists": participant["assists"],
                        "killParticipation": calculate_kp(
                            match,
                            participant["teamId"],
                            participant["kills"],
                            participant["assists"],
                        ),
                        "kda": calculate_kda(participant),
                        "cs": participant["totalMinionsKilled"]
                        + participant["neutralMinionsKilled"],
                        "summoner1Id": dictionary.dict_summoner_spells[
                            participant["summoner1Id"]
                        ],
                        "summoner2Id": dictionary.dict_summoner_spells[
                            participant["summoner2Id"]
                        ],
                        "primaryRune": filter_rune(
                            participant["perks"]["styles"][0]["selections"][0]["perk"],
                            runes_data,
                        ),
                        "items": {
                            "item1": filter_item(participant["item0"], items_data),
                            "item2": filter_item(participant["item1"], items_data),
                            "item3": filter_item(participant["item2"], items_data),
                            "item4": filter_item(participant["item3"], items_data),
                            "item5": filter_item(participant["item4"], items_data),
                            "item6": filter_item(participant["item5"], items_data),
                            "item7": filter_item(participant["item6"], items_data),
                        },
                        "win": participant["win"],  # bool
                    }
                )

                break

    return player_data


def filter_item(item_id, items_data):
    """Returns a String if item exists, else None

    Filters each given item id into a full URL with the item's image."""

    if item_id == 0:
        return None
    else:
        return items_data[str(item_id)]["icon"]


def filter_rune(rune_id, runes_data):
    """Returns a String

    Filters rune Id into half of a URL path. To be combined with:
    https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/
    """

    for rune in runes_data:
        if rune["id"] == rune_id:
            return rune["iconPath"].replace("/lol-game-data/assets/v1", "").lower()


def time_elapsed(game_end_timestamp):
    """Returns a String

    Calculates time elapsed since the match was played until today.

    Only accepts UNIX timestamps in miliseconds"""

    match_end_time = datetime.fromtimestamp(game_end_timestamp / 1000)

    current_time = datetime.now()

    time_difference = current_time - match_end_time

    # Calculate time difference in terms of months, days, hours, and minutes
    months = time_difference.days // 30
    days = time_difference.days % 30
    hours = time_difference.seconds // 3600
    minutes = (time_difference.seconds % 3600) // 60

    # Determine the highest time unit
    if months > 0:
        return f"{months} months"
    elif days > 0:
        return f"{days} days"
    elif hours > 0:
        return f"{hours} hours"
    else:
        return f"{minutes} minutes"


def calculate_kp(match, player_team, player_kills, player_assists):
    """Returns an Int

    Calculates the Kill Participation and tranformes to %"""

    if player_kills + player_assists == 0:
        return 0

    team_kills = 0

    for participant in match["info"]["participants"]:
        if participant["teamId"] == player_team:
            team_kills = team_kills + participant["kills"]

    return int(((player_kills + player_assists) / team_kills) * 100)


def calculate_kda(participant_data):
    """Returns a Float

    Calculates the KDA base on the info of the player kills, deaths and assists"""

    kills = participant_data["kills"]
    deaths = participant_data["deaths"]
    assists = participant_data["assists"]

    if deaths != 0:
        kda = (kills + assists) / deaths
        kda = round(kda, 2)
        kda = "%.2f:1" % kda
    else:
        kda = "Perfect"

    return kda


async def get(url, session):
    try:
        async with session.get(url=url) as response:
            if response.status == 200:
                return await response.json()
    except Exception as e:
        print("Unable to get url {} due to {}.".format(url, e.__class__))


async def main(urls):
    async with aiohttp.ClientSession() as session:
        ret = await asyncio.gather(*(get(url, session) for url in urls))
    return ret
