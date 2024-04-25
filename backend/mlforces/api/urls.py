from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),  # post
    path('refresh/', TokenRefreshView.as_view()),  # post
    path('logout/', logout),  # post

    path('register/', CreateUserView.as_view(), name='register'),
    path('signup/', UserListAPIView.as_view()),

    path('tasks/', task_list),  # get, post
    path('tasks/<int:pk>', get_task),  # get, put, delete

    path('solutions/', SolutionListCreate.as_view()),  # get, post
    path('solutions/<int:pk>', SolutionDetail.as_view()),  # get, put, delete
    path('tasks/<int:pk>/solutions', task_solution),  # get

    path('comments/', CommentListCreate.as_view()),  # get, post
    path('comments/<int:pk>', CommentDetail.as_view()),  # get, put, delete
    path('tasks/<int:pk>/comments', task_comment),  # get

    path('users/', UserListAPIView.as_view()),  # get
    path('users/<int:pk>', UserDetailView.as_view()),  # get

    path('rating/', rank_list),  # get
    path('profiles/', profile_list),  # get, post
    path('profiles/<int:pk>', get_profile),  # get, put
    path('profiles/<int:pk>/rank', get_rank)  # get
]