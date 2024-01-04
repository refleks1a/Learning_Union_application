from rest_framework import serializers

from .models import Major


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ["name", "num_students"]


class CreateMajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Major
        fields = ["name"]