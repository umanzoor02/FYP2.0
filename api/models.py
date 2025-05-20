from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone   


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username= models.CharField(max_length=100, blank=True, null=True)
    email_id = models.EmailField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
                           
#   profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username
    
    
class Child(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='children')
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name