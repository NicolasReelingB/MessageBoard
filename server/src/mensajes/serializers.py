from rest_framework import serializers
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator
from .models import Message, Category, Like, Comment
from django.contrib.auth.models import User

class MessageSerializer(serializers.Serializer):
    pk = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=255)
    pub_date = serializers.DateField(read_only=True) # 'yyyy-mm-dd'
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    author_name = serializers.CharField(read_only=True, source='author.first_name')
    author_username = serializers.CharField(read_only=True, source='author.username')
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.ReadOnlyField(source='category.name')
    total_likes = serializers.IntegerField(read_only=True)
    content = serializers.CharField()

    def create(self, validated_data):
        message = Message()
        message.title = validated_data.get('title')
        message.category = validated_data.get('category')
        message.content = validated_data.get('content')
        message.author = validated_data.get('user')

        message.save()

        return message

    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.category = validated_data.get('category', instance.category)
        instance.content = validated_data.get('content', instance.content)

        instance.save()
        return instance


class CategorySerializer(serializers.Serializer):
    pk = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=255, validators=[UniqueValidator(Category.objects.all(), 'Name must be unique!'),])
    slug = serializers.SlugField(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance


class LikeSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    message = serializers.PrimaryKeyRelatedField(queryset=Message.objects.all())

    class Meta:
        validators = [
            UniqueTogetherValidator(
                    queryset=Like.objects.all(),
                    fields=['user', 'message'],
                    message='already liked the message'
                ),
        ]

    def create(self, validated_data):
        return Like.objects.create(**validated_data)


class CommentSerializer(serializers.Serializer):
    user_username = serializers.ReadOnlyField(source='user.username')
    pub_date = serializers.DateField(read_only=True)
    message = serializers.PrimaryKeyRelatedField(read_only=True)
    comment = serializers.CharField()

    def create(self, validated_data):
        comment = Comment()
        comment.user = validated_data.get('user')
        comment.message = validated_data.get('message')
        comment.comment = validated_data.get('comment')
        comment.save()
        return comment

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()

        return instance

