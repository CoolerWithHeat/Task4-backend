from django.contrib import admin
from django.urls import path, re_path
from django.shortcuts import redirect
from rest_framework.authtoken.views import obtain_auth_token
from UsersBase.views import *

urlpatterns = [
    path('auth/', Authenticate.as_view()),
    path('GetUsers/', GetAllUsers.as_view()),
    path('LockUsers/<str:action_type>/', AdjustStatus.as_view()),
    path('UnLockUsers/<str:action_type>/', AdjustStatus.as_view()),
    path('DeleteUsers/', DeleteUsers.as_view()),
]