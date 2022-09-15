from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.http import Http404

from django.contrib.auth.models import User

from .serializers import UserSerializer
from .permissions import IsUserorReadOnly

@api_view(['GET', 'POST'])
def users(request):

    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserFromToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        serializer =  UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserDetail(APIView):
    permission_classes = [IsUserorReadOnly]
    
    def get_object(self, pk:int):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
        
        return user

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):

        user = self.get_object(pk)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response('User not found!', status=status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        data = JSONParser().parse(request)

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def auth_test_view(request):
    if request.method == 'GET':
        print(request.user.username)
        return Response(f'{request.user}')


    if request.method == 'POST':
        return Response('hey')
