# Generated by Django 4.2 on 2023-12-06 10:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_chatroom_message_delete_chatmessage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='room',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.DeleteModel(
            name='ChatRoom',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]
