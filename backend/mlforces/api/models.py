from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)

    name = models.CharField(max_length=255)
    points = models.IntegerField(default=0)
    statement = models.TextField()

    def __str__(self):
        return self.name


class Solution(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solutions', null=True, blank=True)
    submit_time = models.DateTimeField(null=True, blank=True)

    content = models.TextField()
    points = models.IntegerField(default=0)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="solutions")

    def __str__(self):
        return self.content

    def to_json(self):
        return {'author': self.author.id, 'content': self.content,
                'submit_time': self.submit_time, 'points': self.points}


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments', default=0)

    content = models.TextField()
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.content

    def to_json(self):
        return {'user': self.user.id, 'username': self.user.username, 'content': self.content, 'votes': self.votes}


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #  avatar = models.ImageField(default='default.jpg', upload_to='profile_images')
    points = models.IntegerField(default=0)
    bio = models.TextField()

    def __str__(self):
        return self.user.username
