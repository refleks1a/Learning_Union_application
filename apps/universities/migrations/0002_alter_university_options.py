# Generated by Django 5.0 on 2024-01-02 18:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('universities', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='university',
            options={'verbose_name': 'University', 'verbose_name_plural': 'Universities'},
        ),
    ]
