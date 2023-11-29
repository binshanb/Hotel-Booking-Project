from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AccountUser

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'phone_number', 'is_active', 'role', 'is_superuser')
    search_fields = ('email', 'phone_number')
    
    # Specify a valid field for ordering, for example, 'id'

    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name' ,'role', 'phone_number', 'image')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
       
    )

admin.site.register(AccountUser, CustomUserAdmin)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'address')
    search_fields = ('user__first_name', 'user__last_name', 'user__email', 'address')


