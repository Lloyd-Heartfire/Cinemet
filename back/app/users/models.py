from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    id_user = models.AutoField(primary_key = True)
    username = models.CharField(max_length = 255, unique = True)
    email = models.EmailField(unique = True)
    password = models.CharField(max_length = 255)
    role = models.CharField(max_length = 50, choices=[("admin", "Admin"), ("user", "User")], default = "user")
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
    @property
    def id(self):
        return self.id_user