from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Category, Message, Like, Comment
from .serializers import CommentSerializer, MessageSerializer, CategorySerializer, LikeSerializer
from .permissions import IsOwnerorReadOnly

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def messages(request):

    if request.method == 'GET':
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        data = JSONParser().parse(request)

        if type(data) == dict:
            serializer = MessageSerializer(data=data)
        else:
            serializer = MessageSerializer(many=True, data=data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsOwnerorReadOnly])
def message_detail(request, pk):

    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response('Message not found', status=status.HTTP_404_NOT_FOUND)

    IsOwnerorReadOnly.has_object_permission(request=request, views=message_detail, obj=message)

    if request.method == 'GET':
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(message,data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def categories(request):

    if request.method == 'GET':
        categories = Category.objects.prefetch_related('messages')
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        data = JSONParser().parse(request)

        serializer = CategorySerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response('Not Found!', status=status.HTTP_404_NOT_FOUND)
    

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CategorySerializer(category, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        category.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def like_message(request, pk):
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response('No Message Found!', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = LikeSerializer(data={'user':request.user.pk, 'message':message.pk})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        like = Like.objects.filter(user=request.user, message=message)

        if like.exists():
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response('No like found!', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def comment_message(request, pk):
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response('No Message Found!', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        comments = Comment.objects.filter(message=message)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            serializer.save(user=request.user, message=message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # serializer = CommentSerializer()

