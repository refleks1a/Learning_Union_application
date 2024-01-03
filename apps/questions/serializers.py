from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):

    university = serializers.CharField(source="author.university")
    major = serializers.CharField(source="author.major")
    rating = serializers.DecimalField(source="author.rating")
    top_helper = serializers.BooleanField(source="author.top_helper")


    class Meta:
        model = Question
        fields = ["title", "short_description", "subject",
                  "num_views", "num_answers", "date_asked",
                  "date_last_view", "solved_status", "is_active",
                  "author", "university", "major", "rating",
                  "top_helper"]


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.solved_status:
            representation["solved_status"] = True

        return representation    