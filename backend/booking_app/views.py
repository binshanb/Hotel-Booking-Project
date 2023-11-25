from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Category,Room,RoomFeature,RoomBooking,CheckIn,Payment
from .serializer import CategorySerializer,RoomSerializer,RoomFeatureSerializer,RoomBookingSerializer,PaymentSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import UpdateAPIView
from django.http import JsonResponse
from django.views import View
import razorpay
from decouple import config
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
# # Create your views here.


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 4  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserCategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = CustomPageNumberPagination

class CreateCategoryView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
 

    def create(self, request, *args, **kwargs):

        # Access data using names
        category_name = request.POST.get('categoryName', '').strip()
        image = request.FILES.get('image', None)

        # Check if the category name is unique
        if Category.objects.filter(category_name__iexact=category_name).exists():
            return Response({'detail': 'Category with this name already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'category_name': category_name, 'image': image})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class EditCategoryView(APIView):
    def put(self, request, category_id, *args, **kwargs):
        print(request.data,'dataaaaaaaaaaaaaaaaaaaa')
        updated_category_data = {
            "category_name": request.data.get("category_name"),
          
        }

        img = request.data.get("image")
        if not isinstance(img,str):
            updated_category_data["image"]=img
        try:
            category = Category.objects.get(id=category_id)
            serializer = CategorySerializer(category, data=updated_category_data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class BlockUnblockCategoryView(UpdateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
    



class RoomListView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomListUserView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetailsView(APIView):
 def get(self, request, id):
     room = Room.objects.get(id=id)
     serializer = RoomSerializer([room],many = True)
     print(room.cover_image,'oooooooooooooooo')
     return Response(serializer.data,status= status.HTTP_200_OK) 

 
class CreateRoomView(CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class EditRoomView(APIView):
    def put(self, request, room_id, *args, **kwargs):
        try:
            room = Room.objects.get(id=room_id)
            serializer = RoomSerializer(room, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response({"detail": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

class BlockUnblockRoomView(UpdateAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Room not found"}, status=status.HTTP_404_NOT_FOUND)


class CreateRoomFeatureView(generics.ListCreateAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer

class RoomFeatureView(generics.ListCreateAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer
   


class BlockUnblockRoomFeatureView(UpdateAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'is_blocked' in request.data:
            instance.is_blocked = request.data['is_blocked']
            instance.save()
            return Response(RoomFeatureSerializer(instance).data, status=status.HTTP_200_OK)
        return Response({"error": "is_blocked field not provided in request"}, status=status.HTTP_400_BAD_REQUEST)

       
class EditRoomFeatureView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer

class RoomBookingCreateView(generics.CreateAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer

    def create(self, request, *args, **kwargs):
        print("Request data:", request.data)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RoomBookingListView(generics.ListAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer 
class RoomBookingDetailView(generics.RetrieveAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer



    

class RoomBookingPageView(generics.ListAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer

# class BookingListView(generics.ListAPIView):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer

class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class RazorpayOrderView(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            booking_id = request.data.get('bookingId')
            amount = request.data.get('amount')

            # Initialize Razorpay client with environment variables
            client = razorpay.Client(auth=(config('RAZORPAY_KEY_ID'), config('RAZORPAY_KEY_SECRET')))
            
            # Create a Razorpay order
            order_params = {
                'amount': float(amount) * 100,  # Amount in paise
                'currency': 'INR',
                'receipt': 'receipt_id',  # Replace with a unique identifier for the order
                'payment_capture': 1,
                'notes': {
                    'booking_id': booking_id,
                    'key': config('RAZORPAY_KEY_ID'),
                }, 
            }

            order = client.order.create(data=order_params)

            return Response(order, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


