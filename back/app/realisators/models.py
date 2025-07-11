from django.db import models

# Create your models here.
class Realisator(models.Model):
    id_realisator = models.AutoField(primary_key = True)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"