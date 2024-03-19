import os
import requests

def find_account(server, summoner_name, tag):
	dict = {
		"EUW": "europe",
		"EUNE": "europe",
		"NA": "americas",
	}
	api_url = os.getenv("API_URL").replace("[server]", dict[server])
	endpoint_url = os.getenv("ACCOUNT_SEARCH").replace("[gameName]", summoner_name).replace("[tagLine]", tag)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
		# API call successful
		return api_result.json()
	else:
		# API call failed
		return f"Failed to retrieve summoner information. Error code: {api_result.status_code}"

def find_account_id(server, puuid):
	dict = {
		"EUW": "euw1",
		"EUNE": "eun1",
		"NA": "na1",
	}
	api_url = os.getenv("API_URL").replace("[server]", dict[server])
	endpoint_url = os.getenv("ACCOUNT_SUMMONER_SEARCH").replace("[encryptedPUUID]", puuid)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		return f"Failed to retrieve summoner information. Error code: {api_result.status_code}"

def find_summoner(server, summonerId):
	dict = {
		"EUW": "euw1",
		"EUNE": "eun1",
		"NA": "na1",
	}
	api_url = os.getenv("API_URL").replace("[server]", dict[server])
	endpoint_url = os.getenv("SUMMONER_SEARCH").replace("[encryptedSummonerId]", summonerId)
	api_result = requests.get(api_url + endpoint_url + '?api_key=' + os.getenv("API_KEY"))
	if api_result.status_code == 200:
        # API call successful
		return api_result.json()
	else:
        # API call failed
		return f"Failed to retrieve summoner information. Error code: {api_result.status_code}"
