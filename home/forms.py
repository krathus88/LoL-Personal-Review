from django import forms

class SummonerForm(forms.Form):
    region = forms.CharField(label="Region")
    summoner_name = forms.CharField(label="Summoner Name")
    summoner_tag = forms.CharField(label="Summoner Tag")
    