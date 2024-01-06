from django.urls import path

from .views import (GetAnswerAPIView, GetAnswersOnQuestionAPIView, CreteAnswerAPIView,
                    UploadAnswerImage, GetUsersAnswersAPIView, UpdateAnswerAPIView,
                    DeleteAnswerAPIView, IsSolutionAPIView, DeleteAnswerImageAPIView)

urlpatterns = [
    path("question/", GetAnswersOnQuestionAPIView.as_view(), name="answers-on-question"),
    path("answer/<int:id>/", GetAnswerAPIView.as_view(), name="answer"),
    path("my/", GetUsersAnswersAPIView.as_view(), name="my-answers"),
    path("update/<int:id>/", UpdateAnswerAPIView.as_view(), name="update-answer"),
    path("create/<int:id>/", CreteAnswerAPIView.as_view(), name="create-answer"),
    path("delete/<int:id>/", DeleteAnswerAPIView.as_view(), name="delete-answer"),
    path("is-solution/<int:id>/", IsSolutionAPIView.as_view(), name="is-solution"),
    path("answer/upload-image/", UploadAnswerImage, name="upload-image"),
    path("answer/delete-image/", DeleteAnswerImageAPIView.as_view(), name="delete-image"),
]