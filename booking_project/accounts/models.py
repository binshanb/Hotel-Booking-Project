from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField


#<---------Basics Credentials-------------->

class AccountUserManager(BaseUserManager):  # account user manager
    def create_user(self,email,password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
    
        user = self.model(
            email= self.normalize_email(email),
            
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email, password=None):
        user = self.create_user(
            email=self.normalize_email(email), password=password,)
        user.is_admin = True 
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Role(models.TextChoices):
    GUEST = 'guest','Guest'
    ADMIN = 'admin','Admin'

class AccountUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255,null=True,blank=True)
    last_name = models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = PhoneNumberField(blank=True, null=True)
    image = models.ImageField(upload_to="assets/", null=True,blank=True, default="profile-img.jpg")
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GUEST)

    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


    objects = AccountUserManager()

    def __str__(self):
        return self.email


    
    def has_perm(self, perm, obj = None):
        return self.is_admin
    
    def has_module_perms(self, add_label):
        return True



#<---------------------------Basics Credentials-----End------------------>

#<---------------------------User Profile------------------------------>

class UserProfile(models.Model):
    user = models.OneToOneField(AccountUser, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to="profile_images/", null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)


    def __str__(self):
      if self.user and self.user.first_name:
         return self.user.first_name
      else:
         return "No associated user"
