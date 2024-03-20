import os
import requests
from globals import dictionary

def find_account(server, summoner_name, tag):
	api_url = os.getenv("API_URL").replace("[server]", "europe")
	endpoint_url = os.getenv("ACCOUNT_SEARCH").replace("[gameName]", summoner_name).replace("[tagLine]", tag)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
		# API call successful
		return api_result.json()
	else:
		# API call failed
		return api_result.status_code

def find_account_id(server, puuid):
	api_url = os.getenv("API_URL").replace("[server]", dictionary.dict_server[server])
	endpoint_url = os.getenv("ACCOUNT_SUMMONER_SEARCH").replace("[encryptedPUUID]", puuid)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		return api_result.status_code

def find_summoner(server, summonerId):
	dict = {
		"EUW": "euw1",
		"EUNE": "eun1",
		"NA": "na1",
	}
	api_url = os.getenv("API_URL").replace("[server]", dictionary.dict_server[server])
	endpoint_url = os.getenv("SUMMONER_SEARCH").replace("[encryptedSummonerId]", summonerId)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		return api_result.status_code

def dic_summoner_info(region, summonerName, summonerTag, summonerLevel, summonerIcon):
    dic = {
		"region": region,
		"name": summonerName,
		"tag": summonerTag,
		"level": summonerLevel,
		"iconId": summonerIcon
	}
    return dic

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
	return "RIOT API Error " + dict_of_errors[error].upper()
