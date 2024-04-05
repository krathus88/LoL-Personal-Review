from django.db import models


class Player(models.Model):
    puuid = models.CharField(max_length=78, unique=True)
    server = models.CharField(max_length=4)
    summoner_name = models.CharField(max_length=16)
    summoner_tag = models.CharField(max_length=5)

    @classmethod
    def add_to_db(cls, puuid, server, summoner_name, summoner_tag, additional_info):
        if cls.objects.filter(puuid=puuid).exists():
            return cls.objects.get(puuid=puuid)
        player = cls(
            puuid=puuid,
            summoner_name=summoner_name,
            server=server,
            summoner_tag=summoner_tag,
        )
        player.save()
        PlayerAdditionalInfo.add_to_db(player, additional_info)
        return player

    @classmethod
    def find_db(cls, server, summoner_name, summoner_tag):
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
    def add_to_db(cls, player, additional_info):
        player_additional_info = cls(
            id=player,
            summoner_id=additional_info["id"],
            account_id=additional_info["accountId"],
            level=additional_info["summonerLevel"],
            summoner_icon=additional_info["profileIconId"],
        )
        player_additional_info.save()

    @classmethod
    def find_db(cls, player_id):
        try:
            return cls.objects.get(id=player_id)
        except cls.DoesNotExist:
            return None
