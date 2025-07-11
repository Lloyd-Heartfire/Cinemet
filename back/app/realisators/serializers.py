from rest_framework import serializers
from .models import Realisator

class RealisatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realisator
        fields = ["id", "first_name", "last_name", "created_at"]