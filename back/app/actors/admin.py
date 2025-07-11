from django.contrib import admin
from .models import Actor

# Register your models here.
@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "created_at")
    search_fields = ("first_name", "last_name")