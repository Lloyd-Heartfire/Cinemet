from django.contrib import admin
from .models import Realisator

# Register your models here.
@admin.register(Realisator)
class RealisatorAdmin(admin.ModelAdmin):
    list_display = ("id_realisator", "first_name", "last_name", "created_at")
    search_fields = ("first_name", "last_name")