from unicodedata import category
from django.db import models
from django.utils.text import slugify
from datetime import date
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField('Name', max_length=255, unique=True)
    slug = models.SlugField('Slug', max_length=255, unique=True)


    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'


    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


    def __repr__(self):
        return f'<Category> {self.name}'


    def __str__(self):
        return f'{self.name}'


class Message(models.Model):
    title = models.CharField('title', max_length=255)
    pub_date = models.DateField('Pub Date', default=date.today)
    # author = models.CharField('author', max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    category = models.ForeignKey('category', on_delete=models.CASCADE, related_name='messages')
    content = models.TextField('Content')

    def __repr__(self):
        return f'<Message> {self.title}'


    def __str__(self):
        return f'{self.title}'

