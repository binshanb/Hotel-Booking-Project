"""
ASGI config for booking_project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booking_project.settings')

from chat import routing

django_asgi_application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        'http': django_asgi_application,
        'websocket': AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(routing.websocket_urlpatterns))
        )
    }
)











# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack
# from chat.routing import websocket_urlpatterns as accounts_websocket_urlpatterns
# # from post.routing import websocket_urlpatterns as post_websocket_urlpatterns

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booking_project.settings')
# django_asgi_application = get_asgi_application()

# application = ProtocolTypeRouter({
#     "http": django_asgi_application,
#     "websocket": AllowedHostsOriginValidator(
#         JWTAuthMiddlewareStack(
#              URLRouter(
#                  accounts_websocket_urlpatterns
#              )
#         )
#     ),
# })
# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from chat import routing

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "booking_project.settings")

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             routing.websocket_urlpatterns
#         )
#     ),
# })
