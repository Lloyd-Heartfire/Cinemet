from rest_framework import viewsets, permissions
from .models import ( Movie, ActorMovie, RealisatorMovie, MovieCategorie, ImageMovie, UserRating, UserFavorite, UserWatchlistMovie )
from .serializers import ( MovieSerializer, ActorMovieSerializer, RealisatorMovieSerializer, MovieCategorieSerializer, ImageMovieSerializer, UserRatingSerializer, UserFavoriteSerializer, UserWatchlistMovieSerializer )

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {"request": self.request}

class ActorMovieViewSet(viewsets.ModelViewSet):
    queryset = ActorMovie.objects.all()
    serializer_class = ActorMovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class RealisatorMovieViewSet(viewsets.ModelViewSet):
    queryset = RealisatorMovie.objects.all()
    serializer_class = RealisatorMovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MovieCategorieViewSet(viewsets.ModelViewSet):
    queryset = MovieCategorie.objects.all()
    serializer_class = MovieCategorieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ImageMovieViewSet(viewsets.ModelViewSet):
    queryset = ImageMovie.objects.all()
    serializer_class = ImageMovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserRatingViewSet(viewsets.ModelViewSet):
    queryset = UserRating.objects.all()
    serializer_class = UserRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserFavoriteViewSet(viewsets.ModelViewSet):
    queryset = UserFavorite.objects.all()
    serializer_class = UserFavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserWatchlistMovieViewSet(viewsets.ModelViewSet):
    queryset = UserWatchlistMovie.objects.all()
    serializer_class = UserWatchlistMovieSerializer
    permission_classes = [permissions.IsAuthenticated]