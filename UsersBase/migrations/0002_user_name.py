# Generated by Django 4.2.6 on 2023-10-07 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UsersBase', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='Name',
            field=models.CharField(blank=True, default=None, max_length=50, null=True),
        ),
    ]
