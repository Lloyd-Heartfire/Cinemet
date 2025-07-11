from rest_framework import viewsets, permissions
from .models import Categorie
from .serializers import CategorieSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]