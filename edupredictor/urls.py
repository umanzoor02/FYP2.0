from django.urls import path
from .views import PredictHobbyView
from . import views
urlpatterns = [
    path('predict/',PredictHobbyView.as_view(), name='predict-hobby'),
    path('ai/generate-quiz/', views.generate_quiz),
    path('ai/get-answers/', views.get_answers),

]
