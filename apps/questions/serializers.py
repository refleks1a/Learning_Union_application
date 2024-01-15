from rest_framework import serializers

from .models import Question, QuestionViews


class QuestionSerializer(serializers.ModelSerializer):
    image_1 = serializers.SerializerMethodField()
    image_2 = serializers.SerializerMethodField()
    image_3 = serializers.SerializerMethodField()
    
    profile_photo = serializers.SerializerMethodField()
    author_uid = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ["uid", "title", "details","short_description", "subject",
                  "num_views", "num_answers", "date_asked","date_modified",
                  "date_last_view", "solved_status", "is_active",
                  "image_1", "image_2", "image_3", "author_uid", "profile_photo"]
        
    def get_image_1(self, obj):
        if obj.image_1:
            return obj.image_1.url
        return None
    
    def get_image_2(self, obj):
        if obj.image_2:
            return obj.image_2.url
        return None
    
    def get_image_3(self, obj):
        if obj.image_3:
            return obj.image_3.url
        return None

    def get_author_uid(self, obj):
        return obj.author.id

    def get_profile_photo(self, obj):
        return obj.author.profile_photo.url

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation   


class UpdateQuestionSerializer(serializers.ModelSerializer):
    image_1 = serializers.SerializerMethodField()
    image_2 = serializers.SerializerMethodField()
    image_3 = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ["title", "short_description", "details",
                 "subject", "image_1", "image_2", "image_3",
                 "solved_status", "is_active"]

    def get_image_1(self, obj):
        if obj.image_1:
            return obj.image_1.url
        return None
    
    def get_image_2(self, obj):
        if obj.image_2:
            return obj.image_2.url
        return None
    
    def get_image_3(self, obj):
        if obj.image_3:
            return obj.image_3.url
        return None

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