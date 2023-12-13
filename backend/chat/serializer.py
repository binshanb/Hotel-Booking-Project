from rest_framework import serializers
from .models import Message, ChatRoom
from accounts.serializers import UserSerializer  # Import the AccountUser serializer if available


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    agent = UserSerializer()  # Assuming AccountUserSerializer exists

    class Meta:
        model = ChatRoom
        fields = '__all__'
























# from rest_framework import serializers
# from .models import Message

# class MessageSerializer(serializers.ModelSerializer):
#        class Meta:
#            model = Message
#            fields = ('id', 'username', 'content', 'timestamp')
#            read_only_fields = ('id', 'timestamp')








           
# class ChatRoomListSerializer(serializers.ModelSerializer):
#     unseen_message_count = serializers.SerializerMethodField()
#     members = UserSerializer(many=True)

#     class Meta:
#         model = ChatRoom
#         fields = '__all__'

# # for notifications
#     def get_unseen_message_count(self, obj):
#         user = self.context['request'].user
#         return Message.objects.filter(room=obj, seen=False).exclude(sender=user).count()

#     def to_representation(self, instance):
#         user = self.context['request'].user
#         members = instance.members.exclude(id=user.id)
#         data = super(ChatRoomListSerializer, self).to_representation(instance)
#         data['members'] = UserSerializer(members, many=True).data
#         return data