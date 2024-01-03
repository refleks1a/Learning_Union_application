from rest_framework import serializers
from django_countries.serializer_fields import CountryField

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    fathers_name = serializers.CharField(source="user.fathers_name")

    email = serializers.EmailField(source="user.email")
    country = CountryField(name_only=True)

    full_name = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Profile
        fields = ["username", "first_name", "last_name", "fathers_name",
                  "full_name", "email", "id", "phone_number",
                  "profile_photo", "about_me","gender",
                  "country", "city", "university", "major", "education_language",
                  "year_of_study", "degree_type", "is_student", "is_teacher", "is_other"
                  ]
        

    def get_full_name(self, obj):    
        first_name = obj.user.first_name.title()
        last_name = obj.user.last_name.title()
        fathers_name = obj.user.fathers_name.title()

        return f"{first_name} {last_name} {fathers_name}"
    

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.top_helper:
            representation["top_helper"] = True

        return representation


class UpdateProfileSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = [
            "phone_number", "profile_photo", "about_me",
            "gender", "country", "city",
            "is_student", "is_teacher", "is_other",
            "year_of_study", "degree_type", 
            "university", "major", "education_language",
        ]
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.top_agent:
            representation["top_helper"] = True

        return representation     