from django.urls import path

from .views import (GetQuestionAPIView, GetQuestionsListAPIView, GetSolvedQuestionsAPIView, CreateQuestionAPIView,
                    GetUsersQuestionsAPIView, UpdateQuestionAPIView, DeleteQuestionAPIView)


urlpatterns = [
    path("all/", GetQuestionsListAPIView.as_view(), name="all-questions"),
    path("all/solved/", GetSolvedQuestionsAPIView.as_view(), name="all-solved-questions"),
    path("my/", GetUsersQuestionsAPIView.as_view(), name="my-questions"),
    path("update/<int:id>/", UpdateQuestionAPIView.as_view(), name="update-question"),
    path("delete/<int:id>/",  DeleteQuestionAPIView.as_view(), name="delete-question"),
    path("create/", CreateQuestionAPIView.as_view(), name="create-question"),
    path("question/<int:id>/", GetQuestionAPIView.as_view(), name="question"),
]