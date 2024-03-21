import os
import requests
from globals import dictionary

def find_account(summoner_name, tag):
	api_url = os.getenv("API_URL").replace("[server]", "europe")
	endpoint_url = os.getenv("ACCOUNT_SEARCH").replace("[gameName]", summoner_name).replace("[tagLine]", tag)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
		# API call successful
		return api_result.json()
	else:
		# API call failed
		raise Exception(api_result.status_code)

def find_account_id(server, puuid):
	api_url = os.getenv("API_URL").replace("[server]", dictionary.dictServer[server])
	endpoint_url = os.getenv("ACCOUNT_SUMMONER_SEARCH").replace("[encryptedPUUID]", puuid)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		raise Exception(api_result.status_code)

def find_ranked_data(server, summonerId):
	api_url = os.getenv("API_URL").replace("[server]", dictionary.dictServer[server])
	endpoint_url = os.getenv("SUMMONER_SEARCH").replace("[encryptedSummonerId]", summonerId)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		raise Exception(api_result.status_code)

def find_match_history(startCount, numGames, puuid):
	api_url = os.getenv("API_URL").replace("[server]", "europe")
	endpoint_url = os.getenv("SUMMONER_MATCH_HISTORY_SEARCH").replace("[encryptedPUUID]", puuid).replace("[startCount]", startCount).replace("[numGames]", numGames)
	print(api_url + endpoint_url + '&api_key=' + os.getenv("API_KEY"))
	api_result = requests.get(api_url + endpoint_url + '&api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		raise Exception(api_result.status_code)

def find_match_data(matches):
	match_data = []
	api_url = os.getenv("API_URL").replace("[server]", "europe")
	for match in matches:
		endpoint_url = os.getenv("SUMMONER_MATCH_SEARCH").replace("[match]", match)
		print(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
		api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
		match_data.append(api_result)

	return match_data


def organize_summoner_data(region, summonerName, summonerTag, summonerLevel, summonerIcon):
     return {
		"region": region,
		"name": summonerName,
		"tag": summonerTag,
		"level": summonerLevel,
		"iconId": summonerIcon
	}

def organize_summoner_ranked_data(summoner_list):
    solo_queue = {"tier": "unranked"}
    flex_queue = {"tier": "unranked"}

    for input in summoner_list:
        if input['queueType'] == 'RANKED_SOLO_5x5':
            solo_queue = input
        elif input['queueType'] == 'RANKED_FLEX_SR':
            flex_queue = input
    
    return [solo_queue, flex_queue]
    
def calculate_winrate(summoner_data):
	wrSoloQ = None
	wrFlexQ = None
 
	if not summoner_data[0]["tier"] == "unranked":
		wrSoloQ = round(summoner_data[0]["wins"] / (summoner_data[0]["wins"] + summoner_data[0]["losses"]) * 100)
	if not summoner_data[0]["tier"] == "unranked":
		wrFlexQ = round(summoner_data[1]["wins"] / (summoner_data[1]["wins"] + summoner_data[1]["losses"]) * 100)
    
	return [wrSoloQ, wrFlexQ]

def map_error_to_message(error):
	dict_of_errors = {
		400 : "Bad request",
		401 : "Unauthorized",
		403 : "Forbidden",
		404 : "Data not found",
		405 : "Method not allowed",
		415 : "Unsupported media type",
		429 : "Rate limit exceeded",
		500 : "Internal server error",
		502 : "Bad gateway",
		503 : "Service unavailable",
		504 : "Gateway timeout",
	}
	return "RIOT API Error: " + dict_of_errors[error].upper()
