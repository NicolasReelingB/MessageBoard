from django.urls import path

from . import views

urlpatterns = [
    path('messages/', views.messages),
    path('message/<int:pk>/', views.message_detail),
    path('categories/', views.categories),
    path('category/<int:pk>/', views.category_detail),
]