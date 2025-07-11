from django.contrib import admin
from .models import Movie

# Register your models here.
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = (
        "id", "title", "duration", "release_date", "average_rating", "created_at"
    )
    list_filter = ("release_date",)
    search_fields = ("title",)