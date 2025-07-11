from rest_framework import viewsets, permissions
from .models import Realisator
from .serializers import RealisatorSerializer

# Create your views here.
class RealisatorViewSet(viewsets.ModelViewSet):
    queryset = Realisator.objects.all()
    serializer_class = RealisatorSerializer
    perimission_classes = [permissions.IsAuthenticatedOrReadOnly]