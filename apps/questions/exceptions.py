from rest_framework.exceptions import APIException


class QuestionNotFound(APIException):
    status_code = 404
    default_detail = "The requested question doesn't exist"


class NotYourQuestion(APIException):
    status_code = 403
    default_detail = "The requested question doesn't belong to you"


class MissingID(APIException):
    status_code = 400
    default_detail = "Missing the id"


class MissingImageNum(APIException):
    status_code = 400
    default_detail = "Missing the image num"


class MissingQuestionID(APIException):
    status_code = 400
    default_detail = "Missing the question id"