from rest_framework import serializers

from .models import Question
from apps.profiles.models import Profile


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ["title", "short_description", "subject",
                  "num_views", "num_answers", "date_asked",
                  "date_last_view", "solved_status", "is_active",
                  "author", "image_1", "image_2", "image_3"]


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation   


class UpdateQuestionSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Question
        fields = ["title", "short_description", "details",
                 "subject", "image_1", "image_2", "image_3"]


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation    
    

class CreateQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        exclude = ["num_views", "num_answers", "date_asked",
                   "date_modified", "date_last_view", 
                   "solved_status", "is_active"]
