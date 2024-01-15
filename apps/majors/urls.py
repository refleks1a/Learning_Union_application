from django.urls import path

from .views import (MajorsListAPIView, MajorAPIView, CreateMajorAPIView,
                    DeleteMajorAPIView, UpdateMajorAPIView)


urlpatterns = [
    path("all/", MajorsListAPIView.as_view(), name="all-majors"),
    path("major/<str:uid>/", MajorAPIView.as_view(), name="major"),
    path("create/", CreateMajorAPIView.as_view(), name="create-major"),
    path("update/<str:uid>/", UpdateMajorAPIView.as_view(), name="update-major"),
    path("delete/<str:uid>/", DeleteMajorAPIView.as_view(), name="delete-major"),
]