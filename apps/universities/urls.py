from django.urls import path

from .views import (UniversityAPIView, UniversitiesListAPIView, CreateUniversityAPIView, 
                    DeleteUniversityAPIView, UpdateUniversityAPIView)


urlpatterns = [
    path("university/", UniversityAPIView.as_view(), name="university"),
    path("all/", UniversitiesListAPIView.as_view(), name="all-universities"),
    path("create/", CreateUniversityAPIView.as_view(), name="create-university"),
    path("update/", UpdateUniversityAPIView.as_view(), name="update-university"),
    path("delete/", DeleteUniversityAPIView.as_view(), name="delete-university"),
]