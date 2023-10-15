from django.test import TestCase
import requests, json

token = '3e64d1a6be96aca496470cef648d65c5d5aefb3a'
headers = {
    # 'Authorization': f'Token {token}'  ,
}

request = requests.post('http://127.0.0.1:8000/SignUp/', data=json.dumps({'first_name': 'Lebedev', 'email':'Pavel@itransition.com', "password":'lebedev99'}), headers=headers)
print(request.json())