from django.db import models
from accounts.models import AccountUser

# Create your models here.

TYPE = (
    ('A', 'Air Conditioned'),
    ('NA', 'Non Air Conditioned')
)

def room_images_upload_path(instance, file_name):
    return f"{instance.room_slug}/room_cover/{file_name}"

def room_display_images_upload_path(instance, file_name):
    return f"{instance.room.room_slug}/room_display/{file_name}"





class RoomAmenity(models.Model):
    name = models.CharField(max_length=50)

    
    def __str__(self):
        return self.name

class RoomFeature(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
class Room(models.Model):
    title = models.CharField(max_length=30)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=3)
    room_slug = models.SlugField()
    capacity = models.IntegerField()
    room_size = models.CharField(max_length=5)
    cover_image = models.ImageField(upload_to='media/images')
    amenities = models.ManyToManyField(RoomAmenity)
    features = models.ManyToManyField(RoomFeature)

    def __str__(self):
        return self.title
    
class Category(models.Model):
    category_name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='media/images',default='path/to/default_image.jpg' )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'


    def __str__(self):
        return self.category_name



class Customer(models.Model):
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.customer
    
class Booking(models.Model):
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    checking_date = models.DateTimeField(blank=True, null=True)
    checkout_date = models.DateTimeField(null=True, blank=True)
    phone_number = models.CharField(max_length=14, null=True)
    email = models.EmailField()
    
    def __str__(self):
        return self.customer.email


class Payment(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return self.customer


class CheckIn(models.Model):
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14, null=True)
    email = models.EmailField(null=True)

    def __str__(self):
        return self.room.room_slug


class CheckOut(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    check_out_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer


class RoomDisplayImages(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    display_images = models.ImageField(upload_to=room_display_images_upload_path)

    def __str__(self):
        return self.room.room_slug

class Review(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=((1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')))
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('room', 'user')