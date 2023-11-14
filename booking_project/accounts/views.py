from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics,permissions
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserRegisterSerializer
from .serializers import CustomTokenObtainPairSerializer,CustomTokenRefreshSerializer,UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView
from .models import AccountUser
from .models import UserProfile
from .serializers import UserProfileSerializer



class GetRoutesView(APIView):
    def get(self, request):
        routes = [
            'api/token/user',
            'api/token/admin',
            'api/token/refresh/',
            'api/token/verify/',
            'api/user/register',
        
           
            
        ]

        return Response(routes)
    

#<---------------------------User Side-------------------->

class UserRegistrationView(APIView):

    def post(self,request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception = True):
            user=serializer.save()
            return Response(UserRegisterSerializer(user).data,status=status.HTTP_201_CREATED)
        

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

"""class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
"""

#<------------------Admin Side------------------>

class UserListView(generics.ListAPIView):

    serializer_class = UserSerializer
    def get_queryset(self):
        # Filter users by the 'guest' role
        return AccountUser.objects.filter(role='guest')
    
class BlockUnblockUserView(UpdateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return AccountUser.objects.all()
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            return Response({"detail":"User not Found"},status=status.HTTP_404_NOT_FOUND)
        

#<------------------------------User Profile----------------------->

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
        
class AccountUserDetailView(generics.RetrieveUpdateAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [] 

























# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from rest_framework import permissions, status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from accounts.models import CustomUser
# from .serializers import UserRegisterSerializer, UserSerializer
# from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
# from rest_framework.exceptions import AuthenticationFailed

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.db.models import Q


# from django.http import JsonResponse


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):

#         print(user, "login side in server")
#         token = super().get_token(user)

#         # Add custom claims
        
#         token['email'] = user.email
#         token['name'] = user.name
#         token['is_superuser'] = user.is_superuser
#         print("serialissssss",user.image)
#         # token['image'] = user.image


#         # ...

#         return token


# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


# # @api_view(['GET'])
# # def apiOverview(request):
# #     api_urls = {
# #         # admin-side
# #         'account-list': '/user-list/',
# #         # 'admin-user-create': '/user-create/',
# #         'admin-user-delete': '/user-delete/',
# #         'admin-user-update': '/user-update/',

# #         # user-side
# #         'user-create': '/user-create/',
# #         'user-profile': '/user-profile/',
# #         'user-add-img': '/user-add-img/',
# #         'user-edit-img': '/user-edit-img/',
# #     }
# #     return Response(api_urls)

# # class Loginview(APIView):
# #     def post(self, request):
# #         email = request.data["email"]
# #         password = request.data["password"]
# #         try:
# #             user = Account.objects.get(email = email)
# #         except Account.DoesNotExist:
# #             raise AuthenticationFailed("Account does  not exist")
# #         if user is None:
# #             raise AuthenticationFailed("User does not exist")
# #         if not user.check_password(password):
# #             raise AuthenticationFailed("Incorrect Password")
# #         access_token = AccessToken.for_user(user)
# #         refresh_token =RefreshToken.for_user(user)
# #         return Response({
# #             "access_token" : access_token,
# #             "refresh_token" : refresh_token
# #         })

# class RegisterView(APIView):
#     def post(self, request):
#         data = request.data
#         print(data)
#         serializer = UserRegisterSerializer(data=data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
# #currently authenticated user
# class UserView(APIView):
    
#     permission_classes = [permissions.IsAuthenticated]
#     def get(self, request):
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class ImageUploadView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
    
#     def put(self, request, format=None):
#         print('image uploaded', request)
#         data = request.data["image"]
#         print("upload",data)
#         user = request.user
#         user.image = data
#         user.save()
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status = status.HTTP_200_OK)
    
# class RegisteredUserView(APIView):
#     permission_classes = [permissions.IsAdminUser]
   
#     def get(self,request):
#         user = CustomUser.objects.exclude(is_superuser=True)
#         serializer = UserSerializer(user, many=True)
#         return Response(serializer.data,status=status.HTTP_200_OK)  
    
# class UpdateView(APIView):
#     permission_classes = [permissions.IsAdminUser]
#     def post(self, request, id):
#         user = CustomUser.objects.get(id = id)
#         user.name = request.data['name']
#         user.email = request.data['email']
#         user.save()
#         return Response({"message": "success"}, status = status.HTTP_200_OK)

# class DeleteView(APIView):
#     permission_classes = [permissions.IsAdminUser]
#     def get(self,request, id):
#         user = CustomUser.objects.get(id=id)
#         user.delete()
#         return Response({"message": "success"}, status = status.HTTP_200_OK)
    
# def search_users(request):
#     search_term = request.GET.get('q')

#     if search_term:
#         users = CustomUser.objects.exclude(is_superuser=True).filter(
#             Q(name__icontains=search_term) | Q(email__icontains=search_term)
#         )
#     else:
#         users = CustomUser.objects.exclude(is_superuser=True)

#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])

# def block_user(request, email):
#     try:
#         user = CustomUser.objects.get(email=email)
#         user.is_block = True
#         user.save()
#         return JsonResponse({'message': 'User blocked successfully'})
#     except CustomUser.DoesNotExist:
#         return JsonResponse({'error': 'User not found'}, status=404)

# @api_view(['POST'])

# def unblock_user(request, email):
#     try:
#         user = CustomUser.objects.get(email=email)
#         user.is_block = False
#         user.save()
#         return JsonResponse({'message': 'User unblocked successfully'})
#     except CustomUser.DoesNotExist:
#         return JsonResponse({'error': 'User not found'}, status=404)


    