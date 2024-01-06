from django.urls import path

from .views import (GetProfileAPIView, UpdateProfileAPIView, ProfilesListAPIView)


urlpatterns = [
    path("me/", GetProfileAPIView.as_view(), name="get_profile"),
    path("update/", UpdateProfileAPIView.as_view(), name="update_profile"),
    path("all/", ProfilesListAPIView.as_view(), name="all_profiles"),
]