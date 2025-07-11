from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length = 255)
    duration = models.DurationField(help_text = "Durée du film au format HH:MM")
    description = models.TextField()
    trailer_url = models.URLField( blank = True, null = True)
    release_date = models.DateField()
    average_rating = models.FloatField(default = 0.0, validators = [MinValueValidator(0.0), MaxValueValidator(5.0)])
    created_at = models.DateTimeField(auto_now_add = True)

def __str__(self):
    return self.title