from django.contrib import admin
from .models import ( Movie, ActorMovie, RealisatorMovie, MovieCategorie, ImageMovie, UserRating, UserFavorite, UserWatchlistMovie )

# Register your models here.
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ( "id_movie", "title", "duration", "release_date", "average_rating", "created_at" )
    list_filter = ("release_date",)
    search_fields = ("title",)

admin.site.register(ActorMovie)
admin.site.register(RealisatorMovie)
admin.site.register(MovieCategorie)
admin.site.register(ImageMovie)
admin.site.register(UserRating)
admin.site.register(UserFavorite)
admin.site.register(UserWatchlistMovie)