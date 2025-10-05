from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes 
from scheduling.models import Gym, Session
from scheduling.serializers import GymSerializer, SessionSerializer, AppUserSerializer
from scheduling.helpers import populate_gyms
from datetime import datetime
from zoneinfo import ZoneInfo


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(AppUserSerializer(request.user).data)

class GymViewSet(viewsets.ModelViewSet):
    queryset = Gym.objects.all()
    serializer_class = GymSerializer
    
    def create(self, request, *args, **kwargs):
        print("Received request data:", request.data)  # Log the incoming data
        return super().create(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        populate_gyms()
        return super().list(request, *args, **kwargs)
    
# class SessionListAPIView(generics.ListAPIView):
#     queryset = Session.objects.all()
#     serializer_class = SessionSerializer
    
# class SessionDetailAPIView(generics.RetrieveAPIView):
#     queryset = Session.objects.all()
#     serializer_class = SessionSerializer

class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self, *args, **kwargs):
        today = datetime.now(ZoneInfo("Europe/Berlin")).date()
        return Session.objects.all().filter(start__gte=today).order_by('id')
    
    def create(self, request, *args, **kwargs):
        print("Received request data:", request.data)
    
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=201, headers=headers)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this session.")
        instance.delete()