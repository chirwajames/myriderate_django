from django.contrib.auth import admin
from django.urls import path
from . import views
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.my_login, name="login"),
    path('home/', views.home, name="homepage"),
    #path('login/', MyLoginView.as_view(template_name='website/login.html'), name="login"),
    path('login/', views.my_login, name="login"),
    #path('logout/', auth_views.LogoutView.as_view(template_name='website/logout.html'), name="logout"),
    path('logout/', views.my_logout, name="my_logout"),
    path('reset-password/', auth_views.PasswordResetView.as_view(template_name='website/reset-password.html'), name="reset_password"),
    path('reset-password/done', auth_views.PasswordResetDoneView.as_view(template_name='website/reset-password-done.html'),
         name="password_reset_done"),

    path('reset-password-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='website/reset-password-confirm.html'),
         name="password_reset_confirm"),
    #path('home/<int:id>/', views.home, name="homepage"),
    path('daily_log/', views.daily_log, name="daily_log"),
    path('data/', views.trip_json, name="trip_json"),
    path('register/', views.register, name="register"),
    path('profile/', views.profile, name="profile"),
    path('update_pic/', views.update_pic, name="update_pic")

]
