from django.contrib import admin

# Register your models here.
from .models import Project, Employee

admin.site.register(Project)
admin.site.register(Employee)