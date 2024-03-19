from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,AbstractUser, User
# Create your models here.

class JounrneyInfo(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    start_destination = models.CharField(max_length=150, null=True)
    end_destination = models.CharField(max_length=150, null=True)
    km_travelled = models.IntegerField(null=True)
    eta = models.IntegerField()
    date = models.DateField()
    cost = models.IntegerField(null=True)

    class Meta:
        db_table = 'journey_info'
        verbose_name_plural = "Journey Info"
    def __str__(self):
        return f"{self.start_destination}"





class DriverProfile(models.Model):
    user =  models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    id =  models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    #install pillow for images
    image = models.ImageField(default='default.jpg')
    username = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=50)
    rate = models.IntegerField(null=True)
    password = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'driver_profile'
        verbose_name_plural = "driver_profile"
    def __str__(self):
        return f"{self.rate}"
    
    
