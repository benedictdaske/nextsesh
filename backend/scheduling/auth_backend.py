from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from authlib.jose import JsonWebToken, JoseError
from authlib.jose.errors import ExpiredTokenError
import requests

from django.conf import settings
from scheduling.models import AppUser


# authlib setup
jwt = JsonWebToken(['RS256'])

jwks_url = f'https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json'
jwks = requests.get(jwks_url).json()

# userinfo setup
userinfo_url = f'https://{settings.AUTH0_DOMAIN}/userinfo'

class Auth0JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        
        try:
            prefix, token = auth_header.split(' ')
            claims = jwt.decode(
                token,
                jwks,
                claims_options={
                    'aud': {'essential': True, 'value': settings.AUTH0_AUDIENCE},
                    'iss': {'essential': True, 'value': settings.AUTH0_ISSUER},
                }   
            )
            claims.validate()
        except ExpiredTokenError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except JoseError as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {e}')
        
        sub = claims.get('sub')
        if not sub:
            raise exceptions.AuthenticationFailed('Token is missing sub claim')
        
        # get user info from auth0 endpoint
        userinfo = requests.get(
            userinfo_url,
            headers={'Authorization': f'Bearer {token}'}
        ).json()

        user, _ = AppUser.objects.get_or_create(
            auth0_sub = sub,
            defaults = {
                'email': userinfo.get('email'),
                'username': userinfo.get('https://nextsesh.date/claims/username') or userinfo.get('nickname'),
                'picture': userinfo.get('picture'),
            }
        )
        
        return (user, None)