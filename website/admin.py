from django.contrib import admin
from .models import *
from .forms import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class driverAdmin(admin.ModelAdmin):
    list_display = ('username','firstname','lastname','email','rate')


admin.site.register(DriverProfile, driverAdmin)