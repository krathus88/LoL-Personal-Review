import os

def url_find_summoner(server, summoner_name, tag):
	url=os.getenv("API_URL_SUMMONER_NAME")
	url = url.replace("server",server)
	url = url.replace("summoner_name",summoner_name)
	url = url.replace("tag", tag)
	url = url + '?api_key=' + os.getenv("API_KEY")
	return url
