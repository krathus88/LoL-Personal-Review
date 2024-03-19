import os
import requests

def url_find_summoner(server, summoner_name, tag):
	url=os.getenv("API_URL_SUMMONER_NAME")
	url = url.replace("server",server)
	url = url.replace("summoner_name",summoner_name)
	url = url.replace("tag", tag)
	url = url + '?api_key=' + os.getenv("API_KEY")
	api_result = requests.get(url)
	if api_result.status_code == 200:
		# API call successful
		return api_result.json()
	else:
		# API call failed
		return f"Failed to retrieve summoner information. Error code: {api_result.status_code}"
