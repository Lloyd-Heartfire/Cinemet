from rest_framework import serializers
from .models import Realisator

class RealisatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realisator
        fields = ["id_realisator", "first_name", "last_name", "created_at"]