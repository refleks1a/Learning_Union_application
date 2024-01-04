from rest_framework.exceptions import APIException


class QuestionNotFound(APIException):
    status_code = 404
    default_detail = "The requested question doesn't exist"


class NotYourQuestion(APIException):
    status_code = 403
    default_detail = "The requested question doesn't belong to you"