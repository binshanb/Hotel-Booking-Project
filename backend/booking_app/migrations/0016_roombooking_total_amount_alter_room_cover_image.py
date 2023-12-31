# Generated by Django 4.2 on 2023-12-26 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking_app', '0015_alter_room_cover_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='roombooking',
            name='total_amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='room',
            name='cover_image',
            field=models.ImageField(upload_to='media/media/images'),
        ),
    ]
