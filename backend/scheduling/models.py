from django.db import models

# Create your models here.
class AppUser(models.Model):
    auth0_sub = models.CharField(max_length=255, unique=True, db_index=True)
    username = models.CharField(max_length=64)
    email = models.EmailField(max_length=254)
    picture = models.URLField(blank=True)
    
    def __str__(self):
        return self.auth0_sub
    
    # handle django rest frameowrk user permission errors
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    

class Gym(models.Model):
    name = models.CharField(max_length=64)
    default = models.BooleanField(default=False)
    
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    
    address = models.CharField(max_length=64, blank=True)
    postcode = models.CharField(max_length=16, blank=True)
    city = models.CharField(max_length=64, blank=True)
    website = models.URLField(blank=True)
    
    icon = models.ImageField(upload_to='icons/', blank=True)
    
    def __str__(self):
        return self.name
    
    
class Session(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, null=False, related_name="sessions")
    gym = models.ForeignKey(Gym, on_delete=models.SET_NULL, null=True, related_name="sessions")
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)