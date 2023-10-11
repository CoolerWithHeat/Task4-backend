from django.test import TestCase
import requests

token = '3e64d1a6be96aca496470cef648d65c5d5aefb3a'
headers = {
    'Authorization': f'Token {token}'  
}

request = requests.get('http://127.0.0.1:8000/GetUsers/', headers=headers)
print(request.json())