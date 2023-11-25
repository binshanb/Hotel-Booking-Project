from django.urls import path
# from . import views
from .views import *
urlpatterns = [

    path('admin/add-category/', CreateCategoryView.as_view(), name='add-category'),
    path('admin/room-category/<int:category_id>/', EditCategoryView.as_view(), name='update_category'),
    path('admin/room-category/block-unblock/<int:pk>/',BlockUnblockCategoryView.as_view(), name='block_ublock-category'),
    path('admin/room-category/', CategoryListView.as_view(), name='room-category'),
    path('category-list/',UserCategoryListAPIView.as_view(),name="user-category-list"),
    
    
    path('admin/edit-room/<int:room_id>/',EditRoomView.as_view(), name='edit-room'),
    path('admin/add-room/', CreateRoomView.as_view(), name='add-room'),
    path('admin/room-list/', RoomListView.as_view(), name='room-list'),
    path('room-detail/<int:id>/', RoomDetailsView.as_view(), name='room-detail'),
    path('roomlistuser/', RoomListUserView.as_view(), name='room-list-user'),
    path('admin/room-list/block-unblock/<int:pk>/',BlockUnblockRoomView.as_view(), name='block_ublock-room'),

    
    path('admin/edit-feature/<int:feature_id>/',EditRoomFeatureView.as_view(), name='edit-feature'),
    path('admin/add-feature/', CreateRoomFeatureView.as_view(), name='add-feature'),
    path('admin/room-feature/', RoomFeatureView.as_view(), name='room-feature'),
    path('admin/room-feature/block-unblock/<int:pk>/', BlockUnblockRoomFeatureView.as_view(), name='block_ublock-feature'),


    path('add-roombooking/', RoomBookingCreateView.as_view(), name='create-roombooking'),
    path('admin/booking-list/', RoomBookingListView.as_view(), name='booking-list'),
    # path('booking-detail/<int:pk>/', RoomBookingDetailView.as_view(), name='booking-list'),

    path('roombooking-page/<int:id>/', RoomBookingPageView.as_view(), name='booking-page'), 
    path('payments/', PaymentListCreateView.as_view(), name='payment-list-create'),
    path('create-razorpay-order/', RazorpayOrderView.as_view(), name='create_razorpay_order'),

]