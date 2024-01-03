from django.urls import path

from .views import (StudentsListAPIView, TeachersListAPIView, OthersListAPIView,
TopHelpersListAPIView, GetProfileAPIView, UpdateProfileAPIView)


urlpatterns = [
    path("me/", GetProfileAPIView.as_view(), name="get_profile"),
    path("update/<str:username>/", UpdateProfileAPIView.as_view(), name="update_profile"),
    path("students/all/", StudentsListAPIView.as_view(), name="all_students"),
    path("teachers/all/", TeachersListAPIView.as_view(), name="all_teachers"),
    path("others/all/", OthersListAPIView.as_view(), name="all_others"),
    path("top-helpers/all/", TopHelpersListAPIView.as_view(), name="top-helpers"),
]