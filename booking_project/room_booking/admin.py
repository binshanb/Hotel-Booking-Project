from django.contrib import admin
from .models import Room, Category, Customer, Booking, Payment, CheckIn, CheckOut, RoomDisplayImages,RoomAmenity,RoomFeature

# Register your models here.
admin.site.register(Room)
admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Booking)
admin.site.register(Payment)
admin.site.register(CheckIn)
admin.site.register(CheckOut)
admin.site.register(RoomDisplayImages)
admin.site.register(RoomAmenity)
admin.site.register(RoomFeature)