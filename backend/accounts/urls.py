from django.urls import path
from . import views
from .views import  UserRegistrationView,GetRoutesView,UserProfileView #UserTokenView AdminTokenObtainPairView
from .views import CustomTokenObtainPairView, CustomTokenRefreshView,UserListView,BlockUnblockUserView,UserDetailView,UserProfileUpdateView
    
from .views import ResetPasswordView,ForgotPasswordView

urlpatterns = [
    path('',views.GetRoutesView.as_view(),name='getRoutes'),
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
    path('admin/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),
    path('user/user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/detail-view/<int:user_id>/',UserDetailView.as_view(), name='user-detail'),
    path('user/update-profile/', UserProfileUpdateView.as_view(), name='user-updation'),
    path('user/reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('user/forgot-password/', ForgotPasswordView.as_view(), name='reset-password'),

]
    
    
    
    
    
    
    
    
    
    
    
    
    # path('',views.apiOverview),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('me', UserView.as_view(), name="me"),
    # path('register', RegisterView.as_view(), name="register"),
    # path('upload_image',ImageUploadView.as_view(), name = "upload_image"),
    # path('block_user/<str:email>/', views.block_user, name='block_user'),
    # path('unblock_user/<str:email>/', views.unblock_user, name='unblock_user'),
    # path('logout', LogoutView.as_view(), name = "logout"),
    # path('image/<int:pk>/', image_url, name='image_url'),
    # path('delete/<int:id>',DeleteView.as_view(), name = "delete"),
    # path('update/<int:id>', UpdateView.as_view(), name = "update"),
    # path('registered_users/', views.search_users, name='search_users'),
    #path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    # path('login', Loginview.as_view(), name="login"),
    #path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),


    

