import os
import aiohttp
import asyncio
import requests
import logging

from requests.exceptions import HTTPError
from datetime import datetime

from .dictionary import (
    dict_region,
    dict_server,
    dict_summoner_spells,
    dict_runes,
    dict_multikill,
    dict_queue_id,
    dict_place,
)
from .exceptions import RiotAPIException


# region API Calls
def perform_riot_api_call(
    dict, riot_server, api_endpoint, replacements, query_params=None
):
    """General method to perform an API call and return the JSON response."""

    if dict == "region":
        dict_response = dict_region[riot_server]
    elif dict == "server":
        dict_response = dict_server[riot_server]
    else:
        logging.error(
            f"Error selecting which dictionary to use to perform api call. API endpoint: {api_endpoint}"
        )
        raise Exception(detail="Specified server isn't valid.")

    # Replace placeholders in the API URL and endpoint URL
    api_url = os.getenv("API_URL").replace("[server]", dict_response)

    endpoint_url = os.getenv(api_endpoint)
    for placeholder, value in replacements.items():
        endpoint_url = endpoint_url.replace(placeholder, value)

    # Construct the full URL
    full_url = f"{api_url}{endpoint_url}?api_key={os.getenv('API_KEY')}"
    if query_params:
        full_url += "&" + "&".join(f"{k}={v}" for k, v in query_params.items())

    # Perform the API request
    try:
        api_result = requests.get(full_url)
        api_result.raise_for_status()

        return api_result.json()
    except HTTPError as http_err:
        raise RiotAPIException(http_err.response.status_code)


def find_account(riot_server, summoner_name, tag):
    """Returns a Dictionary

    Gets Player's Account information (retrieves PUUID)."""

    return perform_riot_api_call(
        "region",
        riot_server,
        "ACCOUNT_SEARCH",
        {"[gameName]": summoner_name, "[tagLine]": tag},
    )


def find_account_puuid(puuid, riot_server):
    """Returns a Dictionary

    Gets Player's Account information using PUUID."""

    return perform_riot_api_call(
        "region", riot_server, "ACCOUNT_SEARCH_PUUID", {"[puuid]": puuid}
    )


def find_summoner(riot_server, puuid):
    """Returns a Dictionary

    Gets Summoner's Account information"""

    return perform_riot_api_call(
        "server", riot_server, "SUMMONER_SEARCH", {"[encryptedPUUID]": puuid}
    )


def find_ranked_data(riot_server, summoner_id):
    """Returns a List with 2 Dictionaries

    Provides Ranked stats for a given player (by Id). Information must
    then be parsed by organize_summoner_ranked_data() to structure it correctly."""

    return perform_riot_api_call(
        "server", riot_server, "RANKED_SEARCH", {"[encryptedSummonerId]": summoner_id}
    )


def find_match_history(riot_server, start_count, num_games, puuid):
    """Returns a List

    Provides the match history (matchIds) of a given summoner (by PUUID).
    Choose on what index to start and how many matches to filter."""

    return perform_riot_api_call(
        "region",
        riot_server,
        "SUMMONER_MATCH_HISTORY_SEARCH",
        {"[encryptedPUUID]": puuid},
        query_params={"start": start_count, "count": num_games},
    )


def find_match_data_general(riot_server, matches):
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

    api_url = os.getenv("API_URL").replace("[server]", dict_region[riot_server])
    for match in matches:
        endpoint_url = os.getenv("SUMMONER_MATCH_SEARCH_GENERAL").replace(
            "[match]", match
        )
        urls.append(api_url + endpoint_url + "?api_key=" + os.getenv("API_KEY"))

    results = asyncio.run(main(urls))

    # Filter out None entries
    filtered_results = [result for result in results if result is not None]

    return (
        filtered_results[0],
        filtered_results[1],
        filtered_results[2:],
    )  # runes_data, items_data, matches_data


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


# endregion


# region Helper Functions
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


def recently_played_with(puuid, matches):
    """Returns a Dictionary

    Returns the recently played with players."""

    players_stats = {}

    for match in matches:
        player_index = match["metadata"]["participants"].index(puuid)
        player_team = match["info"]["participants"][player_index]["teamId"]

        for participant in match["info"]["participants"]:
            if (
                "riotIdGameName" not in participant
            ):  # Check if "riotIdGameName" is present
                continue

            if participant["puuid"] != puuid and participant["teamId"] == player_team:
                name_tag = (
                    f"{participant['riotIdGameName']}#{participant['riotIdTagline']}"
                )
                # Update games played together
                if name_tag in players_stats:
                    players_stats[name_tag]["gamesPlayed"] += 1
                else:
                    players_stats[name_tag] = {
                        "profileIcon": participant["profileIcon"],
                        "gamesPlayed": 1,
                        "wins": 0,
                    }
                # Update wins and defeats
                if participant["win"]:
                    players_stats[name_tag]["wins"] += 1

    # Calculate winrate and remove entries with less than 2 games played
    players_stats_filtered = {}
    for name_tag, stats in players_stats.items():
        if stats["gamesPlayed"] >= 2:
            stats["winrate"] = round((stats["wins"] / stats["gamesPlayed"]) * 100)
            players_stats_filtered[name_tag] = stats

    # Sort players_stats_filtered by gamesPlayed in descending order
    sorted_stats = dict(
        sorted(
            players_stats_filtered.items(),
            key=lambda item: (item[1]["gamesPlayed"], item[1]["winrate"]),
            reverse=True,
        )
    )

    return sorted_stats


def filter_player_match_data(match_data, runes_data, items_data, puuid):
    """Returns a List of Dictionaries

    Provides GENERAL information about a given match for the player
    (by the given PUUID).

    Accepts multiple matches in a singe List."""

    matches_data = []
    for match in match_data:
        if match == None:
            continue

        players_data = []

        # Calculates game duration
        game_duration = match["info"]["gameDuration"]
        minutes = int(game_duration // 60)
        seconds = int(game_duration % 60)

        max_damage_dealt = max(
            participant["totalDamageDealtToChampions"]
            for participant in match["info"]["participants"]
        )
        max_damage_taken = max(
            participant["totalDamageTaken"]
            for participant in match["info"]["participants"]
        )

        players_performance = calculate_performance(minutes, match)

        blue_gold = 0
        red_gold = 0

        for idx, participant in enumerate(match["info"]["participants"]):
            if participant["teamId"] == 100:
                blue_gold += participant["goldEarned"]
            else:
                red_gold += participant["goldEarned"]

            # Accounts for old API data
            if participant["riotIdGameName"] != "":
                summoner_name = participant["riotIdGameName"]
            elif participant["riotIdName"] != "":
                summoner_name = participant["riotIdName"]
            else:
                summoner_name = participant["summonerName"]

            if participant["riotIdTagline"] != "":
                summoner_tag = participant["riotIdTagline"]
            else:
                summoner_tag = None

            players_data.append(
                {
                    "puuid": participant["puuid"],
                    "summonerName": summoner_name,
                    "summonerTag": summoner_tag,
                    "championId": participant["championId"],
                    "championName": participant["championName"],
                    "level": participant["champLevel"],
                    "kills": participant["kills"],
                    "deaths": participant["deaths"],
                    "assists": participant["assists"],
                    "kda": calculate_kda(participant),
                    "killParticipation": calculate_kp(
                        match,
                        participant["teamId"],
                        participant["kills"],
                        participant["assists"],
                    ),
                    "cs": participant["totalMinionsKilled"]
                    + participant["neutralMinionsKilled"],
                    "summoner1": dict_summoner_spells.get(
                        participant["summoner1Id"], "summoner_empty"
                    ),
                    "summoner2": dict_summoner_spells.get(
                        participant["summoner2Id"], "summoner_empty"
                    ),
                    "primaryRune": filter_rune(
                        participant["perks"]["styles"][0]["selections"][0]["perk"],
                        runes_data,
                    ),
                    "secondaryRune": dict_runes.get(
                        participant["perks"]["styles"][1]["style"], None
                    ),
                    "items": [
                        items_data.get(str(participant["item0"]), {}).get("icon", None),
                        items_data.get(str(participant["item1"]), {}).get("icon", None),
                        items_data.get(str(participant["item2"]), {}).get("icon", None),
                        items_data.get(str(participant["item3"]), {}).get("icon", None),
                        items_data.get(str(participant["item4"]), {}).get("icon", None),
                        items_data.get(str(participant["item5"]), {}).get("icon", None),
                        items_data.get(str(participant["item6"]), {}).get("icon", None),
                    ],
                    "largestMultiKill": dict_multikill[participant["largestMultiKill"]],
                    "damageDealt": participant["totalDamageDealtToChampions"],
                    "damageDealtPercentage": (
                        participant["totalDamageDealtToChampions"]
                        / max_damage_dealt
                        * 100
                    ),
                    "damageTaken": participant["totalDamageTaken"],
                    "damageTakenPercentage": (
                        participant["totalDamageTaken"] / max_damage_taken * 100
                    ),
                    "controlWards": participant["visionWardsBoughtInGame"],
                    "wardsPlaced": participant["wardsPlaced"],
                    "wardsKilled": participant["wardsKilled"],
                    "performanceScore": round(
                        min(max(players_performance[idx]["score"], 0), 10), 1
                    ),
                    "performanceRanking": players_performance[idx]["rank"],
                    "win": participant["win"],  # bool
                }
            )
        matches_data.append(
            {
                "gameMode": dict_queue_id[match["info"]["queueId"]],
                "matchId": match["metadata"]["matchId"],
                "gameDuration": f"{minutes}m {seconds}s",
                "timeSinceGameEnd": time_elapsed(match["info"]["gameEndTimestamp"]),
                "win": "blue" if match["info"]["teams"][0]["win"] else "red",
                "playersData": players_data,
                "objectives": [
                    {
                        "kills": match["info"]["teams"][0]["objectives"]["champion"][
                            "kills"
                        ],
                        "gold": blue_gold,
                        "baron": match["info"]["teams"][0]["objectives"]["baron"][
                            "kills"
                        ],
                        "dragon": match["info"]["teams"][0]["objectives"]["dragon"][
                            "kills"
                        ],
                        "riftHerald": match["info"]["teams"][0]["objectives"][
                            "riftHerald"
                        ]["kills"],
                        "voidgrubs": match["info"]["teams"][0]["objectives"]["horde"][
                            "kills"
                        ],
                        "towers": match["info"]["teams"][0]["objectives"]["tower"][
                            "kills"
                        ],
                        "inhibitors": match["info"]["teams"][0]["objectives"][
                            "inhibitor"
                        ]["kills"],
                    },
                    {
                        "kills": match["info"]["teams"][1]["objectives"]["champion"][
                            "kills"
                        ],
                        "gold": red_gold,
                        "baron": match["info"]["teams"][1]["objectives"]["baron"][
                            "kills"
                        ],
                        "dragon": match["info"]["teams"][1]["objectives"]["dragon"][
                            "kills"
                        ],
                        "riftHerald": match["info"]["teams"][1]["objectives"][
                            "riftHerald"
                        ]["kills"],
                        "voidgrubs": match["info"]["teams"][1]["objectives"]["horde"][
                            "kills"
                        ],
                        "towers": match["info"]["teams"][1]["objectives"]["tower"][
                            "kills"
                        ],
                        "inhibitors": match["info"]["teams"][1]["objectives"][
                            "inhibitor"
                        ]["kills"],
                    },
                ],
            }
        )

    return matches_data


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

    # Calculate time difference in terms of years, months, days, hours and minutes
    years = time_difference.days // 365
    months = time_difference.days // 30
    days = time_difference.days % 30
    hours = time_difference.seconds // 3600
    minutes = (time_difference.seconds % 3600) // 60

    # Determine the highest time unit
    if years > 0:
        return f"{years} years"
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


def calculate_performance(game_time, match):
    """Returns a Dictionary

    Calculates the performance of all players in a given match"""

    scores = []

    for participant_data in match["info"]["participants"]:
        gold_minutes = participant_data["goldEarned"] / game_time
        damage_minutes = participant_data["totalDamageDealt"] / game_time
        level_minutes = participant_data["champLevel"] / game_time
        kills_assists_minutes = (
            participant_data["kills"] + participant_data["assists"]
        ) / game_time
        deaths_minutes = participant_data["deaths"] / game_time

        score = (
            0.336
            - (1.437 * deaths_minutes)
            + (0.000117 * gold_minutes)
            + (0.443 * kills_assists_minutes)
            + (0.264 * level_minutes)
            + (0.000013 * damage_minutes)
        )

        scores.append(score * 10)

    # Sorting the scores and assigning ranks
    ranked_scores = sorted(scores, reverse=True)
    ranked_list = []

    if match["info"]["teams"][0]["win"]:
        mvp_range = range(0, 5)
        ace_range = range(5, 10)
    else:
        mvp_range = range(5, 10)
        ace_range = range(0, 5)

    for idx, score in enumerate(scores):
        if idx in mvp_range and score == max(scores[mvp_range[0] : mvp_range[-1] + 1]):
            ranked_list.append({"rank": "MVP", "score": score})
        elif idx in ace_range and score == max(
            scores[ace_range[0] : ace_range[-1] + 1]
        ):
            ranked_list.append({"rank": "ACE", "score": score})
        else:
            rank = ranked_scores.index(score) + 1
            ranked_list.append({"rank": dict_place[rank], "score": score})

    return ranked_list


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


# endregion
