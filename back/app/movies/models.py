from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Movie(models.Model):
    # Clé primaire auto-incrémentée
    id_movie = models.AutoField(primary_key = True)

    # Titre du film (max. 255 caractères)
    title = models.CharField(max_length = 255)

    # Durée au format décimal
    duration = models.DecimalField(max_digits = 4, decimal_places = 2, help_text = "Durée du film au format HH:MM")

    # Description du film (optionnel)
    description = models.TextField(blank = True)

    # URL du trailer
    trailer_url = models.URLField( blank = True, null = True)

    # Date de sortie du film
    release_date = models.DateField()

    # Note moyenne du film
    average_rating = models.FloatField(default = 0.0, validators = [MinValueValidator(0.0), MaxValueValidator(5.0)])

    # Date et heure de création en DB
    created_at = models.DateTimeField(auto_now_add = True)

    # Relation avec Realisators
    realisators = models.ManyToManyField(
        "realisators.Realisator",
        through = "RealisatorMovie",
        related_name = "movies"
    )

    # Relation avec Categories
    categories = models.ManyToManyField(
        "categories.Categorie",
        through = "MovieCategorie",
        related_name = "movies"
    )

    # Relation avec Actors
    actors = models.ManyToManyField(
        "actors.Actor",
        through = "ActorMovie",
        related_name = "movies"
    )

    # Relation avec Images
    images = models.ManyToManyField(
        "images.Image",
        through = "ImageMovie",
        related_name = "movies"
    )

    class Meta:
        # Nom exact de la table SQL
        db_table = "movies"
    
# Table d'association entre movies et realisators
class RealisatorMovie(models.Model):

    # Clé étrangère vers movies
    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = 'id_movie'
    )

    # Clé étrangère vers realisators
    realisator = models.ForeignKey(
        "realisators.Realisator",
        on_delete = models.CASCADE,
        db_column = "id_realisator"
    )

    class Meta:

        # Nom exact de la table SQL
        db_table = "realisator_movies"

        # Empêche les doublons
        unique_together = (("movie", "realisator"),)
    
# Table d'association entre movies et categories
class MovieCategorie(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = "id_movie"
    )

    categorie = models.ForeignKey(
    "categories.Categorie",
    on_delete = models.CASCADE,
    db_column = "id_categorie"
    )

    class Meta:
        db_table = "movie_categories"
        unique_together = (("movie", "categorie"),)

# Table d'association entre movies et actors
class ActorMovie(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = "id_movie"
    )

    actor = models.ForeignKey(
    "actors.Actor",
    on_delete = models.CASCADE,
    db_column = "id_actor"
    )

    class Meta:
        db_table = "actor_movies"
        unique_together = (("movie", "actor"),)

# Table d'association entre movies et images
class ImageMovie(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = "id_movie"
    )

    image = models.ForeignKey(
    "images.Image",
    on_delete = models.CASCADE,
    db_column = "id_image"
    )

    class Meta:
        db_table = "image_movies"
        unique_together = (("movie", "image"),)

# Note d'un utilisateur sur un film
class UserRating(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        db_column = "id_user"
    )

    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = "id_movie"
    )

    # Valeur de la note de 0 à 5
    rating = models.SmallIntegerField()
    
    class Meta:
        db_table = "user_ratings"
        unique_together = (("user", "movie"),)
    
# Favori d'un user pour un film
class UserFavorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        db_column = "id_user"
    )

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        db_column='id_movie'
    )

    # Date d'ajout en favori de manière automatique
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        db_table = "user_favorites"
        unique_together = (("user", "movie"),)

# Film ajouté à la watchlist d'un user
class UserWatchlistMovie(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        db_column = "id_user"
    )

    movie = models.ForeignKey(
        Movie,
        on_delete = models.CASCADE,
        db_column = "id_movie"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_watchlist_movies'
        unique_together = (('user', 'movie'),)

def __str__(self):
    return self.title