from django.urls import path
from . import views



urlpatterns = [
    path('api/create_message/', views.MessageCreateView.as_view(), name='create-message'),
    path('api/messages/', views.MessageListView.as_view(), name='message-list'),
    path('api/create_chatroom/', views.ChatRoomCreateView.as_view(), name='create-chatroom'),
    path('api/chatrooms/', views.ChatRoomListView.as_view(), name='chatroom-list'),
]