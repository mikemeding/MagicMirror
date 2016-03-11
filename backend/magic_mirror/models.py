from __future__ import unicode_literals

from django.db import models


class Setting(models.Model):
    key = models.CharField(max_length=200)
    value = models.CharField(max_length=200)

    def __str__(self):
        # string representation is JSON formatted
        return '{"' + self.key + '":"' + self.value + '"}'
