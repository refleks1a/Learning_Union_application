from rest_framework.exceptions import APIException


class UniversityNotFound(APIException):
    status_code = 404
    default_detail = "The requested university doesn't exist!"
