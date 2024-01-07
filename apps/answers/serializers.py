from django.test import TestCase
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import Answer


class AnswerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="author.user.username")
    email = serializers.EmailField(source="author.user.email")

    full_name = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Answer
        fields = ["uid", "title", "description", "date_answered", "date_modified",
                  "username", "email", "full_name", "image_1",
                  "image_2", "image_3", "question"]
        
        
    def get_full_name(self, obj):
        first_name = obj.author.user.first_name
        last_name = obj.author.user.last_name
        fathers_name = obj.author.user.fathers_name

        return f"{first_name} {last_name} {fathers_name}"
    

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.is_solution:
            representation["is_solution"] = True

        return representation
    

class UpdateAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer  
        fields = ["uid", "title", "description", "date_answered",
                 "date_modified", "image_1", "image_2", "image_3", "question"]


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.is_solution:
            representation["is_solution"] = True

        return representation     
    

class UpdateIsSolutionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ["is_solution"]


class CreateAnswerSerializer(serializers.ModelSerializer):

        class Meta:
            model = Answer
            exclude = ["id"]