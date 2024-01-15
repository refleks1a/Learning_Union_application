from django.urls import path

from .views import (UniversityAPIView, UniversitiesListAPIView, CreateUniversityAPIView, 
                    DeleteUniversityAPIView, UpdateUniversityAPIView)


urlpatterns = [
    path("university/<str:uid>/", UniversityAPIView.as_view(), name="university"),
    path("all/", UniversitiesListAPIView.as_view(), name="all-universities"),
    path("create/", CreateUniversityAPIView.as_view(), name="create-university"),
    path("update/<str:uid>/", UpdateUniversityAPIView.as_view(), name="update-university"),
    path("delete/<str:uid>/", DeleteUniversityAPIView.as_view(), name="delete-university"),
]