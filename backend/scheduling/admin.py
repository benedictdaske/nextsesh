from django.contrib import admin
from scheduling.models import Gym, Session, AppUser

# Register your models here.
admin.site.register(Gym)
admin.site.register(Session)
admin.site.register(AppUser)