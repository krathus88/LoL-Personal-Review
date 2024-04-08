from django.db import models


class Player(models.Model):
    puuid = models.CharField(max_length=78, unique=True)
    server = models.CharField(max_length=4)
    summoner_name = models.CharField(max_length=16)
    summoner_tag = models.CharField(max_length=5)

    @classmethod
    def find(cls, server, summoner_name, summoner_tag):
        try:
            return cls.objects.get(
                server__iexact=server.strip(),
                summoner_name__iexact=summoner_name.strip(),
                summoner_tag__iexact=summoner_tag.strip(),
            )
        except cls.DoesNotExist:
            return None


class PlayerAdditionalInfo(models.Model):
    id = models.OneToOneField(Player, on_delete=models.CASCADE, primary_key=True)
    summoner_id = models.CharField(max_length=63)
    account_id = models.CharField(max_length=56)
    level = models.PositiveIntegerField()
    summoner_icon = models.PositiveIntegerField()

    @classmethod
    def find(cls, player_id):
        try:
            return cls.objects.get(id=player_id)
        except cls.DoesNotExist:
            return None
