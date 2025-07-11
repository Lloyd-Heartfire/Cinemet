from rest_framework import viewsets, permissions
from .models import Actor
from .serializers import ActorSerializer

# Create your views here.
class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    perimission_classes = [permissions.IsAuthenticatedOrReadOnly]