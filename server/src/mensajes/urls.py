from django.urls import path

from . import views

urlpatterns = [
    path('messages/', views.Messages.as_view()),
    path('message/<int:pk>/', views.MessageDetail.as_view()),
    path('message/<int:pk>/like/', views.LikeMessage.as_view()),
    path('message/<int:pk>/comment/', views.CommentMessage.as_view()),
    path('categories/', views.CategoriesView.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),
]