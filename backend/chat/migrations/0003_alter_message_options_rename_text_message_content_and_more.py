# Generated by Django 4.2 on 2023-12-06 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_rename_room_message_chat_room'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ('timestamp',)},
        ),
        migrations.RenameField(
            model_name='message',
            old_name='text',
            new_name='content',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='created_at',
            new_name='timestamp',
        ),
        migrations.RemoveField(
            model_name='message',
            name='chat_room',
        ),
        migrations.RemoveField(
            model_name='message',
            name='seen',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.AddField(
            model_name='message',
            name='username',
            field=models.CharField(default='default_value', max_length=255),
        ),
        migrations.AlterModelTable(
            name='message',
            table='chat_message',
        ),
        migrations.DeleteModel(
            name='ChatRoom',
        ),
    ]
