from rest_framework import viewsets
from .models import Setting
from .serializers import SettingSerializer


class SettingsViewSet(viewsets.ModelViewSet):
    '''
    API endpoint for accessing settings for magic_mirror
    '''
    queryset = Setting.objects.all()
    serializer_class = SettingSerializer
