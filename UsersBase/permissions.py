from rest_framework import permissions
import json
from django.contrib.auth import get_user_model

class EligibleAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        return not request.user.is_anonymous and request.user.is_admin
    
class UnblockedAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            body = json.loads(request.body) if request.body else None
            user = get_user_model().objects.get(email=body.get('email', None))
            return user.is_active if not user.is_anonymous else False
        except:
            return False