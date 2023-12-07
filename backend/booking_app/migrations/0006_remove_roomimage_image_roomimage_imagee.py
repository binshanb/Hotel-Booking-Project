# Generated by Django 4.2 on 2023-11-30 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking_app', '0005_roomimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomimage',
            name='image',
        ),
        migrations.AddField(
            model_name='roomimage',
            name='imagee',
            field=models.ImageField(default='path/to/default_image.jpg', upload_to='media/images'),
        ),
    ]