from django.contrib import admin
from .models import Category, Message, Comment, Like

# Register your models here.
admin.site.register(Category)
admin.site.register(Message)
admin.site.register(Comment)
admin.site.register(Like)
