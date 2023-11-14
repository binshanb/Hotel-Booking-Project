from django.urls import path
# from . import views
from .views import *
urlpatterns = [

    path('admin/add-category/', CreateCategoryView.as_view(), name='add-category'),
    path('admin/room-category/<int:category_id>/', EditCategoryView.as_view(), name='update_category'),
    path('admin/room-category/block-unblock/<int:pk>/',BlockUnblockCategoryView.as_view(), name='block_ublock-category'),
    
    path('admin/room-category/', CategoryListView.as_view(), name='room-category'),
    path('admin/edit-room/<int:room_id>/',EditRoomView.as_view(), name='edit-room'),
    path('admin/add-room/', CreateRoomView.as_view(), name='add-room'),

    path('admin/room-list/', RoomListView.as_view(), name='room-list'),
    path('room-detail/<int:id>/', RoomDetailsView.as_view(), name='room-detail'),
    path('roomlistuser/', RoomListUserView.as_view(), name='room-list-user'),

    
    path('admin/room-list/block-unblock/<int:pk>/',BlockUnblockRoomView.as_view(), name='block_ublock-room'),

    path('admin/edit-amenities/<int:room_id>/',EditRoomAmenityView.as_view(), name='edit-amenities'),
    path('admin/add-amenities/', CreateRoomAmenityView.as_view(), name='add-amenities'),

    path('admin/room-amenities/', RoomAmenityView.as_view(), name='room-amenities'),

    path('admin/edit-feature/<int:room_id>/',EditRoomFeatureView.as_view(), name='edit-feature'),
    path('admin/add-feature/', CreateRoomFeatureView.as_view(), name='add-feature'),

    path('admin/room-feature/', RoomFeatureView.as_view(), name='room-feature'),

    path('add-booking/', CreateBookingView.as_view(), name='create-booking'),
    path('admin/booking-list/', BookingListView.as_view(), name='booking-list'),
    path('booking-page/', BookingPageView.as_view(), name='booking-page'),
    path('booking-payment/', RazorpayOrderView.as_view(), name='razorpay-order'),

    






    # path('admin/roomlist', RoomListView.as_view(),  name='roomlist'),
    # path('admin/addroom', RoomCreateView.as_view(),  name='addroom'),
 
]


#     path('book/', BookingCreateApiView.as_view(), name='book_room'),
#     path('checkout/', CheckoutView.as_view(), name="checkout"),
#     path('get_current_checked_in_rooms/', CheckedInView.as_view(), name="checked_in_rooms"),
# ]