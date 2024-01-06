from rest_framework.exceptions import APIException


class AnswerNotFound(APIException):
    status_code = 404
    default_detail = "The requested answer doesn't exist"


class NotYourAnswer(APIException):
    status_code = 403
    default_detail = "The requested answer doesn't belong to you"


class PermissionDenied(APIException):
    status_code = 403
    default_detail = "Permission denied"


class MissingID(APIException):
    status_code = 400
    default_detail = "Missing the id"


class MissingImageNum(APIException):
    status_code = 400
    default_detail = "Missing the image num"


class MissingAnswerID(APIException):
    status_code = 400
    default_detail = "Missing the answer id"   