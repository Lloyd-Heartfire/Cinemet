from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "duration", "description", "trailer_url", "release_date", "average_rating", "created_at"]
        read_only_fields = ["average_rating", "created_at"]