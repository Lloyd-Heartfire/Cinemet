from django.db import models

class Categorie(models.Model):
    id_categorie = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 255, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name