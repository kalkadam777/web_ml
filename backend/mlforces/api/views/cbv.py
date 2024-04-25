from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from api.serializers import UserBasicSerializer

from django.contrib.auth.models import User


class UserListAPIView(APIView):
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        serializer = UserBasicSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserBasicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # insert into ...
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserBasicSerializer(user)
        return Response(serializer.data)

