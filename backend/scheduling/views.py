from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes 
from scheduling.models import AppUser, Gym, Session
from scheduling.serializers import GymSerializer, SessionSerializer, AppUserSerializer
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
    
# class SessionListAPIView(generics.ListAPIView):
#     queryset = Session.objects.all()
#     serializer_class = SessionSerializer
    
# class SessionDetailAPIView(generics.RetrieveAPIView):
#     queryset = Session.objects.all()
#     serializer_class = SessionSerializer

class SessionViewSet(viewsets.ModelViewSet):
    today = datetime.now(ZoneInfo("Europe/Berlin")).date()
    queryset = Session.objects.all().filter(start__gte=today).order_by('id')
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def create(self, request, *args, **kwargs):
        print("Received request data:", request.data)
    
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=201, headers=headers)
    
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this session.")
        instance.delete()