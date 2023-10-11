from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from .serializers import *
from .permissions import EligibleAdmin, UnblockedAdmin
import json

def ReactEstablishment(request):
    return render(request, 'index.html')

def get_referer(request):
    referer = request.META.get('HTTP_REFERER')
    return referer

class Authenticate(APIView):
    permission_classes = [UnblockedAdmin]
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body) if request.body else None
        users = get_user_model()
        possible_user = users.objects.filter(email=body.get('email', None))
        if possible_user:
            valid_password = check_password(body.get('password', None), possible_user[0].password)
            if valid_password:
                token, created = Token.objects.get_or_create(user=users.objects.get(email=body.get('email')))
                current_time = timezone.localtime()
                token.user.last_login = current_time
                token.user.save()
                return Response({'token': str(token)})
            else:
                return Response({'error': 'invalid credentials'}, status=500)
        else:
            return Response({'error': 'user not found'}, status=401)


class GetAllUsers(APIView):
    permission_classes = [EligibleAdmin]
    def get(self, request, *args, **kwargs):
        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)
        users = serializer.data
        return Response({'users': users, 'currentUser':{'name': request.user.Name, 'email':request.user.email}})
        

class AdjustStatus(APIView):
    permission_classes = [EligibleAdmin]

    def post(self, request, *args, **kwargs):
        ID_list = json.loads(request.body) if request.body else None
        try:
            status = {
                'd':False,
                'a':True,
            }
            users = User.objects.filter(id__in=ID_list)
            
            for each_user in users:
                each_user.is_active = status.get(kwargs.get('action_type'))
                each_user.save()

            update_user = User.objects.filter(id__in=ID_list)
            serializer = UserSerializer(update_user, many=True)
            return Response({'updated_users': serializer.data, 'current_blocked':request.user.id in ID_list}, status=200)
        except:
            return Response({'error': 'something went wrong'}, status=500)



class DeleteUsers(APIView):
    permission_classes = [EligibleAdmin]
    def delete(self, request, *args, **kwargs):
        try:
            ID_list = json.loads(request.body) if request.body else None
            currentDeleted = request.user.id in ID_list
            users = User.objects.filter(id__in=ID_list)
            for each_user in users:
                each_user.delete()
            return Response({'DeletedUsers': ID_list, 'currentDeleted':currentDeleted}, status=200)
        except:
            return Response({'error': 'Something Went Wrong'}, status=500)