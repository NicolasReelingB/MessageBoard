from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Message, Category

class MessageSerializer(serializers.Serializer):
    pk = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=255)
    pub_date = serializers.DateField(read_only=True) # 'yyyy-mm-dd'
    author = serializers.CharField(max_length=255)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.ReadOnlyField(source='category.name')
    content = serializers.CharField()

    def create(self, validated_data):
        return Message.objects.create(**validated_data)

    
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
