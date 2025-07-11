from rest_framework import serializers
from .models import Actor

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ["id_actor", "first_name", "last_name", "created_at"]