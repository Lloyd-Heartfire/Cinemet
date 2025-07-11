from django.db import models

class Image(models.Model):
    name = models.CharField(max_length=255, blank=True)
    url = models.TextField()
    is_main = models.BooleanField(default=False)

    class Meta:
        db_table = 'images'
        ordering = ['-is_main', 'name']

    def __str__(self):
        return self.name