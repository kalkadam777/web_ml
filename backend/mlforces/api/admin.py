from django.contrib import admin
from .models import Task, Solution, Comment, Profile


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'author')
    search_fields = ('name',)


admin.site.register(Solution)
admin.site.register(Comment)
admin.site.register(Profile)