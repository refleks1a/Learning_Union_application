from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView

import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from django.utils.datastructures import MultiValueDictKeyError

from .exceptions import NotYourProfile, ProfileNotFound
from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer, UpdateProfileSerializer


#Filters on Profiles model
class ProfilesFilter(django_filters.FilterSet):
    rating_gte = django_filters.NumberFilter(
        field_name="rating", lookup_expr="gte"
    )
    rating_lte = django_filters.NumberFilter(
        field_name="rating", lookup_expr="lte"
    )
    num_reviews_gte = django_filters.NumberFilter(
        field_name="num_reviews", lookup_expr="gte"
    )
    num_reviews_lte = django_filters.NumberFilter(
        field_name="num_reviews", lookup_expr="lte"
    )
    num_reviews_gte = django_filters.NumberFilter(
        field_name="num_reviews", lookup_expr="gte"
    )
    num_reviews_lte = django_filters.NumberFilter(
        field_name="num_reviews", lookup_expr="lte"
    )
    top_helper = django_filters.BooleanFilter(field_name="top_helper")
    is_student = django_filters.BooleanFilter(field_name="is_student")
    is_teacher = django_filters.BooleanFilter(field_name="is_teacher")
    is_other = django_filters.BooleanFilter(field_name="is_other")

    class Meta:
        model = Profile
        fields = ["rating", "num_reviews", "top_helper",
                  "is_student", "is_teacher", "is_other"]


class ProfilesListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = ProfilesFilter
    search_fields = ["user.username", "user.get_full_name"]
    ordering_fields = ["top_helper", "rating", "num_reviews"]


class GetProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer] 


    def get(self, request):
        user = self.request.user
        user_profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(user_profile, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [ProfileJSONRenderer] 

    serializer_class = UpdateProfileSerializer


    def patch(self, request):
        data = request.data

        try:
            username = data["username"]
            profile = Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        user_name = request.user.username

        if user_name != username:
            raise NotYourProfile
        
        # Make sure that the user is not a teacher and a student at the same day
        try:
            if ((profile.is_student and data["is_teacher"] == "True") or 
            (profile.is_teacher and data["is_student"] == "True") or
            (data["is_student"] == "True" and data["is_teacher"] == "True")):
                formatted_message = {"message": "You cannot be a student and a teacher at the same time"} 
                return Response(formatted_message, status=status.HTTP_400_BAD_REQUEST)
    
        except MultiValueDictKeyError: 
            pass

        # Increment/decrement the number of students/teachers     
        try:
            if not profile.is_student and data["is_student"] == "True" and profile.university:
                profile.university.num_students_registered += 1
            elif profile.is_student and data["is_student"] == "False" and profile.university:
                if profile.university.num_students_registered>=1:
                    profile.university.num_students_registered -= 1
        except MultiValueDictKeyError:   
            pass     

        try:
            if not profile.is_teacher and data["is_teacher"] == "True" and profile.university:
                profile.university.num_teachers_registered += 1
            elif profile.is_teacher and data["is_teacher"] == "False" and profile.university:
                if profile.university.num_teachers_registered>=1:
                    profile.university.num_teachers_registered -= 1
        except MultiValueDictKeyError:   
            pass         

        if profile.university:
            profile.university.save() 
            
        serializer = UpdateProfileSerializer(instance=profile, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

        return Response(serializer.data, status=status.HTTP_200_OK)