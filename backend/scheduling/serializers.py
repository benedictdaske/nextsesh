from rest_framework import serializers
from scheduling.models import Gym, Session, AppUser


class GymSerializer(serializers.ModelSerializer):
    # open = serializers.SerializerMethodField()
    # close = serializers.SerializerMethodField()
    
    class Meta:
        model = Gym
        fields = ('id', 'name', 'default', 'opening_time', 'closing_time', 'address', 'postcode', 'city', 'website', 'icon')
        
    # def get_open(self, obj):
    #     return {'hour': obj.opening_time.hour, 'minute': obj.opening_time.minute}
    
    # def get_close(self, obj):
    #     return {'hour': obj.closing_time.hour, 'minute': obj.closing_time.minute}
    
    
class SessionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    
    class Meta:
        model = Session
        fields = ('id', 'user', 'gym', 'start', 'end', 'description', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

    def get_user(self, obj):
        if not obj.user:
            return None
        return {
            'auth0_sub': obj.user.auth0_sub,
            'username': obj.user.username
        }
    
    
class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('auth0_sub', 'username', 'email', 'picture')
    