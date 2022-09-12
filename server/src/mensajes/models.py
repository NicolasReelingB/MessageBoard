from unicodedata import category
from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField('Name', max_length=255, unique=True)
    slug = models.SlugField('Slug', max_length=255, unique=True)


    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Message(models.Model):
    title = models.CharField('title', max_length=255)
    pub_date = models.DateField('Pub Date')
    author = models.CharField('author', max_length=255)
    category = models.ForeignKey('category', on_delete=models.CASCADE, related_name='messages')


