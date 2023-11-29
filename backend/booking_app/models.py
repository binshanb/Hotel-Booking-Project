from django.db import models
from accounts.models import AccountUser
from django.core.validators import MinValueValidator, RegexValidator
from django.core.exceptions import ValidationError

# Create your models here.



class RoomFeature(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Room(models.Model):
    title = models.CharField(max_length=30)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2,validators=[MinValueValidator(0)])
    room_slug = models.SlugField()
    capacity =  models.PositiveIntegerField(validators=[MinValueValidator(0)])
    room_size = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    cover_image = models.ImageField(upload_to='media/images')
    features = models.ManyToManyField(RoomFeature)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class RoomImage(models.Model):
    room = models.ForeignKey(Room, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media/images',default='path/to/default_image.jpg')

    def __str__(self):
        return f"Image for {self.room.title}"

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




class RoomBooking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='roombookings',default=1)
    user = models.ForeignKey(AccountUser, on_delete=models.CASCADE, related_name='bookings',default=1)
    check_in = models.DateTimeField(null=True, blank=True)
    check_out = models.DateTimeField(null=True, blank=True)
    number_of_guests = models.IntegerField(null=True, blank=True)
    
    booking_status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed')
    ], default='pending')
    booking_notes = models.TextField(blank=True)

    def clean(self):
        # Ensure check_out is not before check_in
        if self.check_in and self.check_out and self.check_out < self.check_in:
            raise ValidationError("Check-out date cannot be before check-in date.")
        
    def __str__(self):
        return self.user.email
    

class Payment(models.Model):
    PAYMENT_RAZORPAY = 'razorpay'
    payment_choices = [
        (PAYMENT_RAZORPAY, 'Razorpay'),
    ]

    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100, default='some_default_value')
    payment_method = models.CharField(max_length=100, choices=payment_choices, default=PAYMENT_RAZORPAY)
    amount_paid = models.CharField(max_length=100,default='0')
    status = models.CharField(max_length=100, default='some_default_value')
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.customer.email} -- {self.payment_method}"

class CheckIn(models.Model):
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14, null=True)
    email = models.EmailField(null=True)

    def __str__(self):
        return self.room.room_slug


class CheckOut(models.Model):
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    check_out_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer.email



class Review(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    customer = models.ForeignKey(AccountUser, on_delete=models.CASCADE)

    rating = models.PositiveIntegerField(choices=((1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')))
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('room', 'customer')
