# Generated by Django 4.2.7 on 2024-01-28 16:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('website', '0005_alter_jounrneyinfo_cost_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='jounrneyinfo',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
