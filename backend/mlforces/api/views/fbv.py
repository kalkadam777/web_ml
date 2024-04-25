from django.http import JsonResponse
from api.models import Task, Profile
from api.serializers import TaskSerializer, ProfileSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout as django_logout


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST"])
def task_list(request):
    if request.method == "GET":
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT", "DELETE"])
def get_task(request, pk=None):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = TaskSerializer(
            instance=task,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        task.delete()
        return JsonResponse({"deleted": True})

@permission_classes([IsAuthenticated])
@api_view(["GET", "POST"])
def profile_list(request):
    if request.method == "GET":
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    return Response(serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT"])
def get_profile(request, pk=None):
    try:
        profile = Profile.objects.get(id=pk)
    except Profile.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ProfileSerializer(
            instance=profile,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
def task_solution(request, pk=None):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({"error": str(e)})

    products_json = [p.to_json() for p in task.solutions.all()]

    return JsonResponse(products_json, safe=False)


@permission_classes([IsAuthenticated])
def task_comment(request, pk=None):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({"error": str(e)})

    comments_json = [comment.to_json() for comment in task.comments.all()]

    return JsonResponse(comments_json, safe=False)


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST"])
def profile_list(request):
    if request.method == "GET":
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def rank_list(request):
    profiles = Profile.objects.order_by('-points').all()
    serializer = ProfileSerializer(profiles, many=True)
    return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_rank(request, pk):
    profile = Profile.objects.get(id=pk)
    points = profile.points

    context = {
        'user': profile.user.username,
        'rank': points,
    }
    
    return JsonResponse(context)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    django_logout(request)
    return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
