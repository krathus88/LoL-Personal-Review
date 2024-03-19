from django.db import models

# Create your models here.
class Player(models.Model):
	puuid = models.CharField(max_length=78)
	summoner_name = models.CharField(max_length=16)
	server = models.CharField(max_length=4)
	summoner_tag = models.CharField(max_length=5)

class PlayerAddicionalInfo(models.Model):
	id = models.OneToOneField(Player, on_delete=models.CASCADE, primary_key = True)
	summoner_id = models.CharField(max_length=63)
	account_id = models.CharField(max_length=56)
	level = models.PositiveIntegerField()
	summoner_icon = models.PositiveIntegerField()
