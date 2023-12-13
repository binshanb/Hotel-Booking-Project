from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path('ws/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
]






















# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.urls import re_path
# from chat.consumers import ChatConsumer

# websocket_urlpatterns = [
#     re_path(r'chat/', ChatConsumer.as_asgi()),
# ]