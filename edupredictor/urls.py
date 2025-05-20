from django.urls import path
from .views import PredictHobbyView
urlpatterns = [
    path('predict/',PredictHobbyView.as_view(), name='predict-hobby'),
]
