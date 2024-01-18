from rest_framework import serializers
from django_countries.serializer_fields import CountryField

from apps.questions.models import Question
from apps.questions.serializers import QuestionSerializer

from apps.answers.models import Answer
from apps.answers.serializers import AnswerSerializer

from apps.universities.models import University
from apps.universities.serializers import UniversitySerializer

from apps.majors.models import Major
from apps.majors.serializers import MajorSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source="user.username")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    fathers_name = serializers.CharField(source="user.fathers_name")

    email = serializers.EmailField(source="user.email")
    country = CountryField(name_only=True)

    university = serializers.SerializerMethodField()
    major = serializers.SerializerMethodField()

    
    questions = serializers.SerializerMethodField(read_only=True)
    answers = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Profile
        fields = ["id", "username", "first_name", "last_name", 
                  "fathers_name", "email", "phone_number",
                  "profile_photo", "about_me","gender", "country",
                  "city", "university", "major", "education_language", "year_of_study",
                  "degree_type", "is_student", "is_teacher", "is_other",
                  "answers", "questions", "rating", "top_helper", "num_reviews"
                  ]
        

    def get_questions(self, obj):
        questions = Question.objects.filter(author=obj)
        serializer = QuestionSerializer(questions, many=True)

        return serializer.data
    

    def get_answers(self, obj):
        answers = Answer.objects.filter(author=obj)
        serializer = AnswerSerializer(answers, many=True)

        return serializer.data
    

    def get_university(self, obj):
        if obj.university:
            university = University.objects.get(name=obj.university.name)
            serializer = UniversitySerializer(university)
            return serializer.data
        return None
    

    def get_major(self, obj):
        if obj.major:
            major = Major.objects.get(name=obj.major.name)
            serializer = MajorSerializer(major)
            return serializer.data
        return None


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
            "phone_number", "about_me", "profile_photo", 
            "gender", "country", "city", "university", "major",
            "year_of_study", "degree_type", "education_language", 
            "is_student", "is_teacher", "is_other"
        ]
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.top_helper:
            representation["top_helper"] = True

        return representation     
        