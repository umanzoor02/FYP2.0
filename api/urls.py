from django.urls import path
from api import views
from rest_framework.routers import DefaultRouter
from .views import ChildViewSet



urlpatterns = [
    #path('user/', views.UserProfileList.as_view(), name='user-profile-list'),  # List and create user profiles
    path('child/<int:pk>/', views.ChildList.as_view(), name='child-detail'),  # Retrieve, update, or delete a user profile by ID
    path('create-profile/', views.CreateUserProfileView.as_view(), name='create-profile'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('me/', views.UserProfileDetailView.as_view(), name='user-profile-detail'),
    path('me/update/', views.UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('children/', views.ChildList.as_view(), name='child-list'),
    path('all-children/', views.ChildListView.as_view(), name='child-list'),
    path('Children/<int:pk>/', ChildViewSet.as_view({'get': 'retrieve'}), name='child-detail'),

]

