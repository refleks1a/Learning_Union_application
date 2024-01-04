from django.urls import path

from .views import (UniversityAPIView, UniversitiesListAPIView, CreateUniversityAPIView, 
                    DeleteUniversityAPIView, UpdateUniversityAPIView, MostActiveUniversitiesAPIView)


urlpatterns = [
    path("university/<str:name>/", UniversityAPIView.as_view(), name="university"),
    path("all/", UniversitiesListAPIView.as_view(), name="all-universities"),
    path("most-active/", MostActiveUniversitiesAPIView.as_view(), name="most-active-universities"),
    path("create/", CreateUniversityAPIView.as_view(), name="create-university"),
    path("update/<str:name>/", UpdateUniversityAPIView.as_view(), name="update-university"),
    path("delete/<str:name>/", DeleteUniversityAPIView.as_view(), name="delete-university"),
]