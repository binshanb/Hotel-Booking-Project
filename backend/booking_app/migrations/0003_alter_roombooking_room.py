# Generated by Django 4.2 on 2023-11-22 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('booking_app', '0002_alter_roombooking_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roombooking',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='roombookings', to='booking_app.room'),
        ),
    ]
