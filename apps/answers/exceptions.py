from rest_framework.exceptions import APIException


class AnswerNotFound(APIException):
    status_code = 404
    default_detail = "The requested answer doesn't exist"


class NotYourAnswer(APIException):
    status_code = 403
    default_detail = "The requested answer doesn't belong to you"