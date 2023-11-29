from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Category,Room,RoomFeature,RoomBooking,CheckIn,Payment,Review,RoomImage
from .serializer import CategorySerializer,RoomSerializer,RoomFeatureSerializer,RoomBookingSerializer,PaymentSerializer,RoomAvailabilityCheckSerializer,ReviewSerializer
from .serializer import DashboardSerializer,RoomImageSerializer

from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView,RetrieveUpdateAPIView
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
from datetime import datetime
from django.db.models import Q
from django.utils import timezone
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
        
class RoomImageListCreateAPIView(generics.ListCreateAPIView):
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer
        
        
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
 

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    def get(self, request, id):
      room = Room.objects.get(id=id)
      serializer = RoomSerializer([room],many = True)
      print(room.cover_image,'oooooooooooooooo')
      return Response(serializer.data,status= status.HTTP_200_OK) 
    def put(self, request, *args, **kwargs):
        room = self.get_object()
        room.is_booked = False
        room.save()
        return Response({'message': 'Checkout successful'}, status=status.HTTP_200_OK)

 
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


# class RoomAvailabilityCheckView(generics.GenericAPIView):
#     serializer_class = RoomAvailabilityCheckSerializer

#     def get(self, request, *args, **kwargs):
#         check_in_date = self.request.query_params.get('check_in')
#         check_out_date = self.request.query_params.get('check_out')

#         serializer = self.get_serializer(data={'check_in': check_in_date, 'check_out': check_out_date})
#         serializer.is_valid(raise_exception=True)
        
#         # Implement your logic here to check room availability based on check_in_date and check_out_date
#         # For example, query your database to check room availability for the given dates

#         # Assuming is_available is a boolean indicating room availability
#         is_active = True  # Implement your logic to check availability

#         return Response({'is_available': is_active})


class AvailableRoomsListView(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
      
        check_in_date = datetime.strptime(self.request.GET.get('check_in'), '%Y-%m-%d')
        check_out_date = datetime.strptime(self.request.GET.get('check_out'), '%Y-%m-%d')

        # Fetch rooms available between check-in and check-out dates
        available_rooms = Room.objects.filter(
            is_active=True,  # Filter active rooms
       ).exclude(
        # Exclude rooms that have bookings conflicting with the specified date range
        Q(roombookings__check_in__lt=check_out_date, roombookings__check_out__gt=check_in_date)
    ).distinct()
           
        
        return available_rooms

class RoomBookingCreateView(CreateAPIView):
    serializer_class = RoomBookingSerializer
    queryset = RoomBooking.objects.all()

    def create(self, request, *args, **kwargs):
        response = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response['data'] = serializer.data
        response['response'] = "Room is successfully booked"
        return Response(response, status=status.HTTP_201_CREATED, headers=headers)

    # def post(self, request, *args, **kwargs):
    #     room = get_object_or_404(Room, pk=request.data['room'])
    #     if room.is_booked:
    #         return Response({"response": "Room is already booked"}, status=status.HTTP_200_OK)
    #     room.is_booked = True
    #     room.save()
    #     checked_in_room = CheckIn.objects.create(
    #         customer=request.user,
    #         room=room,
    #         phone_number=request.data['phone_number'],
    #         email=request.data['email']
    #     )
    #     checked_in_room.save()
    #     return self.create(request, *args, **kwargs)

class RoomBookingListView(generics.ListAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer 
class RoomBookingDetailView(generics.RetrieveAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer

class MyBookingsListView(ListAPIView):
    serializer_class = RoomBookingSerializer  # Replace 'BookingSerializer' with your actual serializer
    queryset = RoomBooking.objects.all() 

class RoomBookingCancelView(RetrieveUpdateAPIView):
    serializer_class = RoomBookingSerializer  # Replace 'BookingSerializer' with your actual serializer
    queryset = RoomBooking.objects.all()  # Replace 'Booking' with your actual model name


    

class RoomBookingPageView(generics.ListAPIView):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer

class ChangeBookingStatus(APIView):
    def put(self, request, booking_id):
        booking = get_object_or_404(RoomBooking, id=booking_id)
        new_status = request.data.get('booking_status')

        # Update the booking status
        booking.booking_status = new_status
        booking.save()

        serializer = RoomBookingSerializer(booking)  # Adjust serializer according to your needs

        return Response(serializer.data, status=status.HTTP_200_OK)

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

class ReviewListCreateAPIView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewListAPIView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class DashboardDataAPIView(APIView):
    def get(self, request):
        # Simulated data for demonstration purposes
        pie_chart_data = [
            {"_id": "Category A", "count": 10},
            {"_id": "Category B", "count": 20},
            # Add more data as needed
        ]

        bar_graph_data = [
            {"_id": "Data 1", "totalTravelers": 5},
            {"_id": "Data 2", "totalTravelers": 15},
            # Add more data as needed
        ]

        statistics_data = {
            "averagePackagePrice": 250,  # Sample statistic values
            "totalAmount": 5000,
            "totalMembers": 50,
            # Add more statistics as needed
        }

        # Constructing the data into the serializer
        serializer_data = {
            'pieChart': pie_chart_data,
            'barGraph': bar_graph_data,
            'statistics': statistics_data,
        }

        serializer = DashboardSerializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)