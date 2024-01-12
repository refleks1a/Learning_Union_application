from rest_framework.pagination import PageNumberPagination


class MajorPagination(PageNumberPagination):
    page_size = 4