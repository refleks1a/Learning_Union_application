from rest_framework.pagination import PageNumberPagination


class UniversityPagination(PageNumberPagination):
    page_size = 4