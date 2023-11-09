from django.shortcuts import get_object_or_404
from .models import Category,Room,RoomAmenity,RoomFeature
from .serializer import CategorySerializer,RoomSerializer,RoomAmenitySerializer,RoomFeatureSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import UpdateAPIView
from django.http import JsonResponse
from django.views import View
# # Create your views here.


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CreateCategoryView(APIView):
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
        updated_category_data = {
            "category_name": request.data.get("categoryName"),
          
        }

        img=request.data("image")
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

class RoomDetailsView(View):
 def get(self, request, id):
        try:
            room = Room.objects.get(id=id)
            room_data = {
                'title': room.title,
                'category':room.category,
                'cover_image':room.cover_image,
                'price_per_night':room.price_per_night,
                'capacity':room.capacity,
                'room_size':room.room_size,
                'amenities':room.amenities,
                'features':room.features,


            }
            return JsonResponse(room_data)
        except Room.DoesNotExist:
            return JsonResponse({'error': 'Room not found'}, status=404)

 
class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def post(self, request, *args, **kwargs):
        # Extract data from the request
        title = request.data.post('title', room.title).strip()
        category_id = request.data.get('category', room.category.id)
        price_per_night = request.data.post('pricePerNight', room.price_per_night)
        room_slug = request.data.post('roomSlug', room.room_slug).strip()
        is_booked = request.data.post('isBooked', room.is_booked)
        capacity = request.data.post('capacity', room.capacity)
        room_size = request.data.post('roomSize', room.room_size).strip()
        cover_image = request.FILES.post('coverImage', room.cover_image)
        amenities = request.data.getlist('amenities', room.amenities.all().values_list('id', flat=True))
        features = request.data.getlist('features', room.features.all().values_list('id', flat=True))

        # Perform validation if necessary

        # Create the room object
        room = Room(
            title=title,
            category_id=category_id,
            price_per_night=price_per_night,
            room_slug=room_slug,
            is_booked=is_booked,
            capacity=capacity,
            room_size=room_size,
            cover_image=cover_image
        )
        room.save()

        # Add amenities and features
        room.amenities.add(*amenities)
        room.features.add(*features)

        # Serialize the created room
        room_serializer = RoomSerializer(room)

        return Response({'room': room_serializer.data}, status=status.HTTP_201_CREATED)




class EditRoomView(APIView):
    serializer_class = RoomSerializer

    def put(self, request, room_id, *args, **kwargs):
        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response({'detail': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Extract data from the request
        title = request.data.get('title', room.title).strip()
        category_id = request.data.get('category', room.category.id)
        price_per_night = request.data.get('pricePerNight', room.price_per_night)
        room_slug = request.data.get('roomSlug', room.room_slug).strip()
        is_booked = request.data.get('isBooked', room.is_booked)
        capacity = request.data.get('capacity', room.capacity)
        room_size = request.data.get('roomSize', room.room_size).strip()
        cover_image = request.FILES.get('coverImage', room.cover_image)
        amenities = request.data.getlist('amenities', room.amenities.all().values_list('id', flat=True))
        features = request.data.getlist('features', room.features.all().values_list('id', flat=True))

        # Perform validation if necessary

        # Update the room object
        room.title = title
        room.category_id = category_id
        room.price_per_night = price_per_night
        room.room_slug = room_slug
        room.is_booked = is_booked
        room.capacity = capacity
        room.room_size = room_size
        room.cover_image = cover_image

        room.save()

        # Update amenities and features
        room.amenities.set(amenities)
        room.features.set(features)

        # Serialize the updated room
        room_serializer = RoomSerializer(room)

        return Response({'room': room_serializer.data}, status=status.HTTP_200_OK)

    

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

class CreateRoomAmenityView(generics.ListCreateAPIView):
    queryset = RoomAmenity.objects.all()
    serializer_class = RoomAmenitySerializer

class RoomAmenityView(generics.ListCreateAPIView):
    queryset = RoomAmenity.objects.all()
    serializer_class = RoomAmenitySerializer
   
class EditRoomAmenityView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoomAmenity.objects.all()
    serializer_class = RoomAmenitySerializer

class CreateRoomFeatureView(generics.ListCreateAPIView):
    queryset = RoomAmenity.objects.all()
    serializer_class = RoomFeatureSerializer

class RoomFeatureView(generics.ListCreateAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer
   
class EditRoomFeatureView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoomFeature.objects.all()
    serializer_class = RoomFeatureSerializer










# class BookingCreateApiView(CreateAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = BookingSerializer
#     queryset = Booking.objects.all()

#     def create(self, request, *args, **kwargs):
#         response = {}
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         response['data'] = serializer.data
#         response['response'] = "Room is successfully booked"
#         return Response(response, status=status.HTTP_201_CREATED, headers=headers)

#     def post(self, request, *args, **kwargs):
#         room = get_object_or_404(Room, pk=request.data['room'])
#         if room.is_booked:
#             return Response({"response": "Room is already booked"}, status=status.HTTP_200_OK)
#         room.is_booked = True
#         room.save()
#         checked_in_room = CheckIn.objects.create(
#             customer=request.user,
#             room=room,
#             phone_number=request.data['phone_number'],
#             email=request.data['email']
#         )
#         checked_in_room.save()
#         return self.create(request, *args, **kwargs)


# class CheckoutView(APIView):
#     def post(self, request):
#         room = get_object_or_404(Room, pk=request.data['pk'])
#         checked_in_room = CheckIn.objects.get(room__pk=request.data['pk'])
#         print(checked_in_room)
#         room.is_booked = False
#         room.save()
#         checked_in_room.delete()
#         return Response({"Checkout Successful"}, status=status.HTTP_200_OK)


# class CheckedInView(ListAPIView):
#     permission_classes = (IsAdminUser, )
#     serializer_class = CheckinSerializer
#     queryset = CheckIn.objects.order_by('-id')

