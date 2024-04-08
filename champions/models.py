from django.db import models


class Champion(models.Model):
    name = models.CharField(max_length=32)
    wr = models.FloatField()
