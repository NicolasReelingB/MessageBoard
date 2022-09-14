from django.urls import path

from . import views

urlpatterns = [
    path('messages/', views.messages),
    path('message/<int:pk>/', views.message_detail),
    path('message/<int:pk>/like/', views.like_message),
    path('message/<int:pk>/comment/', views.comment_message),
    path('categories/', views.categories),
    path('category/<int:pk>/', views.category_detail),
]