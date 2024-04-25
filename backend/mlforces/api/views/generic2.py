from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import Solution, Comment, User
from api.serializers import SolutionSerializer2, CommentSerializer2, UserBasicSerializer


class CreateUserView(generics.GenericAPIView):
    serializer_class = UserBasicSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserBasicSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserBasicSerializer(user, context=self.get_serializer_context()).data,
                "token": str(RefreshToken.for_user(user).access_token),
            })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SolutionListCreate(generics.ListCreateAPIView):  # get, post
    permission_classes = (IsAuthenticated,)
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer2


class SolutionDetail(generics.RetrieveUpdateDestroyAPIView):  # get, put, delete
    permission_classes = (IsAuthenticated,)
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer2


class CommentListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2
