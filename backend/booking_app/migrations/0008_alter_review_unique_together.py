# Generated by Django 4.2 on 2023-12-02 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking_app', '0007_remove_roomimage_imagee_roomimage_image'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='review',
            unique_together=set(),
        ),
    ]
