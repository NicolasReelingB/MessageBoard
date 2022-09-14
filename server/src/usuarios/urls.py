from django.urls import path
from rest_framework.authtoken import views as auth_views
from . import views

urlpatterns = [
    path('users/', views.users),
    path('user/<int:pk>/', views.user),
    path('auth/test/', views.auth_test_view),
    path('user/obtain-token/', auth_views.obtain_auth_token),
]

