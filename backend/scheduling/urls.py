from django.urls import path, include
# from scheduling.views import GymListAPIView, GymDetailAPIView, SessionListAPIView, SessionDetailAPIView

from scheduling.views import me, SessionViewSet, GymViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('sessions', SessionViewSet, basename='sessions')
router.register('gyms', GymViewSet, basename='gyms')

urlpatterns = [
    path("me/", me, name="me"),
]
urlpatterns += router.urls