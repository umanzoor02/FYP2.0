from django.urls import path
from . import views
urlpatterns = [
    path('bmi-calculate/',views.CustomBMICalculateView.as_view(), name='bmi-calculate'),
]
