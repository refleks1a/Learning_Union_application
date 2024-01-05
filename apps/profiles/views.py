from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView

import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from .exceptions import NotYourProfile, ProfileNotFound
from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer, UpdateProfileSerializer


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


    def patch(self, request, username):
        try:
            Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        user_name = request.user.username

        if user_name != username:
            raise NotYourProfile
        
        data = request.data
        serializer = UpdateProfileSerializer(instance=request.user.profile, data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)