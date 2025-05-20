from django.urls import path
from . import views

urlpatterns = [
    #path('predict/', views.PredictAnxietyView.as_view(), name='predict'),
    path('predict/', views.PredictDepressionView.as_view(), name='predict-anxiety'),
]
