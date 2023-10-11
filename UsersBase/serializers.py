from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils import timezone

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    last_login = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'email', 'Name', 'last_login', 'status']

    def get_status(self, data_object):
        return 'active' if data_object.is_active else 'blocked'
    
    def get_last_login(self, data_object):
        date = data_object.last_login
        return timezone.localtime(date).strftime("%Y-%m-%d/%H:%M").split('/') if date else ['never ', 'logged in']