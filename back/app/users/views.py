from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets
from app.users.serializers import UserSerializer

User = get_user_model()

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]