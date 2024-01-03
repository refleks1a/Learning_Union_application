from rest_framework import serializers

from .models import University


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ["name", "short_name", "date_created",
                  "city", "country", "address", "phone_number",
                  "num_teachers", "num_students", "website",
                  "activity_lvl", "is_active", "rector", "description",
                  "num_students_registered", "num_teachers_registered",
                  "local_ranking", "international_ranking"]