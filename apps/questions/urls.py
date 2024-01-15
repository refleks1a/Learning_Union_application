from django.urls import path

from .views import (GetQuestionAPIView, GetQuestionsListAPIView, UploadQuestionImage,
                    CreateQuestionAPIView, GetUsersQuestionsAPIView, DeleteQuestionImageAPIView,
                    UpdateQuestionAPIView, DeleteQuestionAPIView)


urlpatterns = [
    path("all/", GetQuestionsListAPIView.as_view(), name="all-questions"),
    path("my/", GetUsersQuestionsAPIView.as_view(), name="my-questions"),
    path("update/<str:uid>/", UpdateQuestionAPIView.as_view(), name="update-question"),
    path("delete/<str:uid>/",  DeleteQuestionAPIView.as_view(), name="delete-question"),
    path("create/", CreateQuestionAPIView.as_view(), name="create-question"),
    path("question/<str:uid>/", GetQuestionAPIView.as_view(), name="question"),
    path("question/<str:uid>/upload-image/", UploadQuestionImage, name="upload-image"),
    path("question/<str:uid>/delete-image/", DeleteQuestionImageAPIView.as_view(), name="delete-image"),
]