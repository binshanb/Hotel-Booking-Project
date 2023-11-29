import re
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.humanize.templatetags import humanize
from .models import Role


# user register serializer

User = get_user_model()

#<-----------------------User Side--------------------------->

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    
    phone_number = serializers.CharField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all(),message = "Phone number already exists"),]
    )

    password = serializers.CharField(write_only=True,required = True)
    password2 = serializers.CharField(write_only=True,required = True)

    class Meta:
        model = User
        fields = ['email','phone_number','password','password2']

    def validate_password(self, password):
        # Password policy: Minimum 6 characters, at least one uppercase letter, one lowercase letter, and one digit
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$', password):
            raise serializers.ValidationError(
                "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            )
        return password

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        phone_number = attrs.get('phone_number', None)
        if phone_number:
            # Define a regex pattern for a standard phone number format (adjust as needed)
            phone_number_pattern = r'^\d{10}$'
            # Check if the phone number matches the pattern
        if not re.match(phone_number_pattern, phone_number):
                raise serializers.ValidationError({"phone_number": "Invalid phone number format. Must be a 10-digit number."})
        return attrs
    
    def create(self, validated_data):
        print("user serializer", validated_data)
        

        user = User.objects.create(
            email = validated_data['email'],
            phone_number = validated_data['phone_number']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod    
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email  # Assuming you have a 'role' field in your user model
        return token

class CustomTokenRefreshSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data['email'] = self.user.email
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','address','city', 'state', 'country']

#<-------------------User Side End-------------->

#<---------------Admin Side------------------>

class UserSerializer(serializers.ModelSerializer):

    date_joined = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    last_login_display = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id','first_name','address','city','state','is_active','image','country','date_joined','last_login_display']

    def get_last_login_display(self, obj):
        return humanize.naturaltime(obj.last_login)
    

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128)
    
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    

    

#<--------------Admin Side End------------------------->

