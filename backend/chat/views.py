from rest_framework import generics
from .models import Message
from .serializer import MessageSerializer

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    ordering = ('-timestamp',)


























# from rest_framework.views import APIView
# from rest_framework import permissions, status, generics
# from rest_framework.response import Response

# from django.db.models import Q
# from django.contrib.auth import get_user_model

# from .models import ChatRoom,Message
# from .serializer import *

# User = get_user_model()


# class SendChatView(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = MessageSerializer

#     def post(self, request, pk):
#         content = request.data.get('content')
#         if content:
#             # Assuming Message model has 'room_id' and 'content' fields
#             message = Message.objects.create(room_id=pk, content=content)
#             serializer = self.serializer_class(message)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response("Content cannot be empty", status=status.HTTP_400_BAD_REQUEST)


# class GetRoomMessagesView(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = MessageSerializer

#     def get_queryset(self):
#         chat_room_id = self.kwargs['pk']
#         return Message.objects.filter(room_id=chat_room_id)

#     def get(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serialized_data = self.serializer_class(queryset, many=True).data
#         return Response(serialized_data, status=status.HTTP_200_OK)


# class GetRoomsView(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = ChatRoomSerializer

#     def get_queryset(self):
#         user = self.request.user
#         return ChatRoom.objects.filter(members=user)

#     def get(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serialized_data = self.serializer_class(queryset, many=True).data
#         return Response(serialized_data, status=status.HTTP_200_OK)
