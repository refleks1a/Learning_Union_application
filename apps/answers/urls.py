from django.urls import path

from .views import (GetAnswerAPIView, GetAnswersOnQuestionAPIView, CreteAnswerAPIView,
                    UploadAnswerImage, GetUsersAnswersAPIView, UpdateAnswerAPIView,
                    DeleteAnswerAPIView, IsSolutionAPIView, DeleteAnswerImageAPIView)

urlpatterns = [
    path("question/<str:uid>/", GetAnswersOnQuestionAPIView.as_view(), name="answers-on-question"),
    path("answer/<str:uid>/", GetAnswerAPIView.as_view(), name="answer"),
    path("my/", GetUsersAnswersAPIView.as_view(), name="my-answers"),
    path("update/<str:uid>/", UpdateAnswerAPIView.as_view(), name="update-answer"),
    path("create/", CreteAnswerAPIView.as_view(), name="create-answer"),
    path("delete/<str:uid>/", DeleteAnswerAPIView.as_view(), name="delete-answer"),
    path("is-solution/<str:uid>/", IsSolutionAPIView.as_view(), name="is-solution"),
    path("answer/<str:uid>/upload-image/", UploadAnswerImage, name="upload-image"),
    path("answer/<str:uid>/delete-image/", DeleteAnswerImageAPIView.as_view(), name="delete-image"),
]