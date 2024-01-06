from rest_framework import serializers

from .models import Major


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ["id", "uid","name", "num_students"]


class CreateMajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Major
        fields = ["name"]


class UpdateMajorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Major
        exclude = ["id", "uid"]