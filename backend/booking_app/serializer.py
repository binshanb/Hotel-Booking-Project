from .models import Category,Room,RoomFeature,RoomBooking,CheckIn,Payment
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RoomFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomFeature
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    features = RoomFeatureSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'

class RoomBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooking
        fields = '__all__'  # Exclude fields managed internally

    def validate(self, data):
        # Ensure check_out is not before check_in
        check_in = data.get('check_in')
        check_out = data.get('check_out')
        if check_in and check_out and check_out < check_in:
            raise serializers.ValidationError("Check-out date cannot be before check-in date.")
        return data
    

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'   


class CheckinSerializer(serializers.ModelSerializer):
    room_id = serializers.IntegerField(source='room.pk')
    room_slug = serializers.SlugField(source='room.room_slug')
    customer_id = serializers.IntegerField(source='customer.pk')
    customer_name = serializers.CharField(source='customer.username')

    class Meta:
        model = CheckIn
        fields = ('phone_number', 'email', 'customer_id', 'customer_name', 'room_id', 'room_slug',)