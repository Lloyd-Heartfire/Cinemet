from rest_framework import serializers
from .models import Movie
from .models import ( RealisatorMovie, MovieCategorie, ActorMovie, ImageMovie, UserRating, UserFavorite, UserWatchlistMovie )

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id_movie", "title", "duration", "description", "trailer_url", "release_date", "average_rating", "created_at"]
        read_only_fields = ["average_rating", "created_at"]

class RealisatorMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealisatorMovie
        fields = ["movie", "realisator"]

class MovieCategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieCategorie
        fields = ["movie", "categorie"]

class ActorMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActorMovie
        fields = ["movie", "actor"]

class ImageMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMovie
        fields = ["movie", "image"]

class UserRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRating
        fields = ["user", "movie", "rating"]

class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorite
        fields = ["user", "movie", "created_at"]

class UserWatchlistMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWatchlistMovie
        fields = ["user", "movie", "created_at"]
