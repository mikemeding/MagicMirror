from django.contrib import admin
from .models import Setting


# Register the settings database object so admin can modify in the UI
admin.site.register(Setting)

