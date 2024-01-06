from rest_framework import serializers

from .models import University


class UniversitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = University
        fields = ["uid", "name", "short_name", "date_created",
                  "country", "city", "address", "phone_number",
                  "num_teachers", "num_students", "website", "head_organization",
                  "rector", "description", "num_students_registered",
                  "num_teachers_registered","local_ranking", "international_ranking",
                  "activity_lvl", "is_active"]
               

class CreateUniversitySerializer(serializers.ModelSerializer):

    class Meta:
        model = University
        fields = ["uid", "name", "short_name", "date_created",
                  "country", "city", "address", "phone_number",
                  "num_teachers", "num_students", "website", "head_organization",
                  "rector", "description", "num_students_registered",
                  "num_teachers_registered","local_ranking", "international_ranking",
                  "activity_lvl", "is_active"]


class UpdateUniversitySerializer(serializers.ModelSerializer):

    class Meta:
        model = University

        fields = ["uid", "name", "short_name", "date_created",
                  "country", "city", "address", "phone_number",
                  "num_teachers", "num_students", "website", "head_organization",
                  "rector", "description", "num_students_registered",
                  "num_teachers_registered","local_ranking", "international_ranking",
                  "activity_lvl", "is_active"]
