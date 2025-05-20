# views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('access')
        refresh = response.data.get('refresh')

        if token:
            res = Response()
            res.set_cookie(
                key='access_token',
                value=token,
                httponly=True,
                secure=False,  # True in production (HTTPS)
                samesite='Lax',
                max_age=3600,
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=7 * 24 * 3600,
            )
            res.data = {'message': 'Login successful'}
            return res
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
