from rest_framework import serializers
from .models import Task, Solution, Comment, Profile

from django.contrib.auth.models import User


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    name = serializers.CharField()
    statement = serializers.CharField()
    start_time = serializers.DateTimeField()
    points = serializers.IntegerField()

    def create(self, validated_data):
        instance = Task(name=validated_data.get('name'), statement=validated_data.get('statement'),
                        start_time=validated_data.get('start_time'), points=validated_data.get('points'),
                        author=validated_data.get('author'))
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name")
        instance.statement = validated_data.get('statement')
        instance.start_time = validated_data.get('start_time')
        instance.points = validated_data.get('points')
        instance.author = validated_data.get('author')
        instance.save()
        return instance


class ProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    bio = serializers.CharField()
    points = serializers.IntegerField()

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    username = serializers.ReadOnlyField(source='user.username')

    def create(self, validated_data):
        instance = Profile(bio=validated_data.get('bio'), points=validated_data.get('points'),
                           user=validated_data.get('user'))
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.bio = validated_data.get("bio")
        instance.points = validated_data.get('points')
        instance.user = validated_data.get('user')
        instance.save()
        return instance


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        #extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class SolutionSerializer2(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    submit_time = serializers.DateTimeField()

    content = serializers.CharField()
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())
    points = serializers.IntegerField()

    class Meta:
        model = Solution
        fields = ('id', 'author', 'submit_time', 'content', 'task', 'points')


class CommentSerializer2(serializers.ModelSerializer):
    content = serializers.CharField()
    votes = serializers.IntegerField()

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    username = serializers.ReadOnlyField(source='user.username')
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())

    class Meta:
        model = Comment
        fields = ('user', 'id', 'content', 'votes', 'username', 'task')
