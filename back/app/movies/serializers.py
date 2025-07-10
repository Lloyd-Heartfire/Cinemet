from django.contrib.auth import get_movie_model
from rest_framework import serializers

Movie = get_movie_model()

class MovieSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source = "owner.username")

    class Meta:
        model = Movie
        fields = ["id", "title", "duration", "description", "trailer_url", "release_date", "average_rating", "created_at"]