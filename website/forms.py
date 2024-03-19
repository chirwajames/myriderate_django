from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import ModelForm
from django.contrib.auth.models import User
from .models import *
from django import forms

from django.forms.widgets import PasswordInput, TextInput
class CreateUserForm(ModelForm):

    class Meta:

        model = User
        fields = ['first_name','last_name', 'email', 'password', 'username']


class UserUpdateForm(ModelForm):

    class Meta:
        model = User
        fields = ['username', 'email']


#The form below will help update profile image
class ProfileUpdateForm(ModelForm):
    class Meta:
        model = DriverProfile
        fields = ['image']





# Authenticate a user (Model Form)

class LoginForm(ModelForm):

    class Meta:

        model = DriverProfile
        fields = ['email', 'password']