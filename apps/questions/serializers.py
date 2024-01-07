from rest_framework import serializers

from .models import Question, QuestionViews


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ["uid", "title", "short_description", "subject",
                  "num_views", "num_answers", "date_asked","date_modified",
                  "date_last_view", "solved_status", "is_active",
                  "image_1", "image_2", "image_3", "author"]
        

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation   


class UpdateQuestionSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Question
        fields = ["title", "short_description", "details",
                 "subject", "image_1", "image_2", "image_3",
                 "solved_status", "is_active"]


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation    
    

class CreateQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        exclude = ["id", "uid", "num_views", "num_answers",
                   "is_active", "solved_status"]
    

class QuestionViewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionViews
        exclude = ["updated_at", "pkid"]