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
from django.contrib.auth.hashers import make_password
from .permissions import EligibleAdmin, UnblockedAdmin
import json

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

    def get(self, request, *args, **kwargs):
        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)
        users = serializer.data
        return Response({'users': users, 'currentUser':{'name': request.user.Name, 'email':request.user.email}})
        

class AdjustStatus(APIView):
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
        

class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body) if request.body else None
        email = body.get('email', None)
        first_name = body.get('first_name', None)
        password = body.get('password', None)

        if (email and first_name and password):
            try:
                already_registered = get_user_model().objects.get(email=email)
                return Response({'error': 'User Already exists!'}, status=409) if already_registered else Exception
            except:
                new_user = get_user_model().objects.create(email=email, password=make_password(password), Name=first_name)
                new_user.admin = True
                new_user.is_active = True
                new_user.save()
                token, created = Token.objects.get_or_create(user=new_user)
                return Response({'message': 'successful!', 'token':f'{token}'}, status=200)
        else:
            return Response({'error': 'insufficient or invalid Credentials!'}, status=500)