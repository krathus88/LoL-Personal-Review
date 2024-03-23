import os
import aiohttp
import asyncio
import requests
from globals import dictionary


def find_account(summoner_name, tag):
    """Returns a Dictionary

    Gets Player's Account information (retrieves PUUID).
    """

    api_url = os.getenv("API_URL").replace("[server]", "europe")
    endpoint_url = (
        os.getenv("ACCOUNT_SEARCH")
        .replace("[gameName]", summoner_name)
        .replace("[tagLine]", tag)
    )
    api_result = requests.get(
        api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
    )
    if api_result.status_code == 200:
        # API call successful
        return api_result.json()
    else:
        # API call failed
        raise Exception(api_result.status_code)


def find_summoner(server, puuid):
    """Returns a Dictionary

    Gets Summoner's Account information"""
    api_url = os.getenv("API_URL").replace("[server]", dictionary.dict_server[server])
    endpoint_url = os.getenv("SUMMONER_SEARCH").replace("[encryptedPUUID]", puuid)
    api_result = requests.get(
        api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
    )
    if api_result.status_code == 200:
        # API call successful
        return api_result.json()
    else:
        # API call failed
        raise Exception(api_result.status_code)


def find_ranked_data(server, summoner_id):
    """Returns a List with 2 Dictionaries

    Provides Ranked stats for a given player (by Id). Information must
    then be parsed by organize_summoner_ranked_data() to structure it correctly."""

    api_url = os.getenv("API_URL").replace("[server]", dictionary.dict_server[server])
    endpoint_url = os.getenv("RANKED_SEARCH").replace(
        "[encryptedSummonerId]", summoner_id
    )
    api_result = requests.get(
        api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY")
    )
    if api_result.status_code == 200:
        # API call successful
        return api_result.json()
    else:
        # API call failed
        raise Exception(api_result.status_code)


def find_match_history(start_count, num_games, puuid):
    """Returns a List

    Provides the match history (matchIds) of a given summoner (by PUUID).
    Choose on what index to start and how many matches to filter."""

    api_url = os.getenv("API_URL").replace("[server]", "europe")
    endpoint_url = (
        os.getenv("SUMMONER_MATCH_HISTORY_SEARCH")
        .replace("[encryptedPUUID]", puuid)
        .replace("[startCount]", start_count)
        .replace("[numGames]", num_games)
    )
    api_result = requests.get(
        api_url + endpoint_url + "&api_key=" + os.getenv("API_KEY")
    )
    if api_result.status_code == 200:
        # API call successful
        return api_result.json()
    else:
        # API call failed
        raise Exception(api_result.status_code)


def find_match_data_general(matches):
    """Returns a List of Dictionaries

    Provides GENERAL information about a given match for all players.

    Accepts multiple matches in a singe List."""

    urls = []
    api_url = os.getenv("API_URL").replace("[server]", "europe")
    for match in matches:
        endpoint_url = os.getenv("SUMMONER_MATCH_SEARCH_GENERAL").replace(
            "[match]", match
        )
        urls.append(api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY"))

    return asyncio.run(main(urls))


def filter_player_match_data(match_data, puuid):
    """Returns a List of Dictionaries

    Provides GENERAL information about a given match for the player
    (by the given PUUID).

    Accepts multiple matches in a singe List."""
    player_data = []
    for match in match_data:
        for participant in match["info"]["participants"]:
            if participant["puuid"] == puuid:
                cs = (
                    participant["totalMinionsKilled"]
                    + participant["neutralMinionsKilled"]
                )
                kill_participation = int(
                    round(participant["challenges"]["killParticipation"] * 100)
                )

                player_data.append(
                    {
                        "puuid": participant["puuid"],
                        "championId": participant["championId"],
                        "level": participant["champLevel"],
                        "kills": participant["kills"],
                        "deaths": participant["deaths"],
                        "assists": participant["assists"],
                        "killParticipation": kill_participation,
                        "cs": cs,
                        "summoner1Id": participant["summoner1Id"],
                        "summoner2Id": participant["summoner2Id"],
                        "win": participant["win"],  # bool
                    }
                )

    return player_data


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
        elif input["queueType"] == "RANKED_FLEX_SR":
            flex_queue = input

    return [solo_queue, flex_queue]


def calculate_winrate(ranked_data):
    """Returns a List, [SoloQ, FlexQ]

    Calculates winrate for each ladder based off of ranked information."""

    wr_solo_q = None
    wr_flex_q = None

    if not ranked_data[0]["tier"] == "unranked":
        wr_solo_q = round(
            ranked_data[0]["wins"]
            / (ranked_data[0]["wins"] + ranked_data[0]["losses"])
            * 100
        )
    if not ranked_data[1]["tier"] == "unranked":
        wr_flex_q = round(
            ranked_data[1]["wins"]
            / (ranked_data[1]["wins"] + ranked_data[1]["losses"])
            * 100
        )

    return [wr_solo_q, wr_flex_q]


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
