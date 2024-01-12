from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ValidationError

import logging

from .models import University
from .serializers import UniversitySerializer, CreateUniversitySerializer, UpdateUniversitySerializer
from .exceptions import UniversityNotFound
from .pagination import UniversityPagination


logger = logging.getLogger(__name__)


# Filters on Universities model
class UniversitiesFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(
        field_name="name", lookup_expr="contains"
    )
    country = django_filters.CharFilter(
        field_name="country", lookup_expr="contains"
    )
    city = django_filters.CharFilter(
        field_name="city", lookup_expr="contains"
    )
    num_students_registered_gte = django_filters.NumberFilter(
        field_name="num_students_registered", lookup_expr="gte"
    )
    num_students_registered_lte = django_filters.NumberFilter(
        field_name="num_students_registered", lookup_expr="lte"
    )
    num_teachers_registered_gte = django_filters.NumberFilter(
        field_name="num_teachers_registered", lookup_expr="gte"
    )
    num_teachers_registered_lte = django_filters.NumberFilter(
        field_name="num_teachers_registered", lookup_expr="lte"
    )
    activity_lvl_gte = django_filters.NumberFilter(
        field_name="activity_lvl", lookup_expr="gte"
    )
    activity_lvl_lte = django_filters.NumberFilter(
        field_name="activity_lvl", lookup_expr="lte"
    )


class UniversitiesListAPIView(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    pagination_class = UniversityPagination
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = UniversitiesFilter

    search_fields = ["uid", "name", "short_name"]
    ordering_fields = ["activity_lvl", "international_ranking", "local_ranking"]


class UniversityAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = request.data
        try:
            uid = data["uid"]
            university =  University.objects.get(uid=uid)
        except University.DoesNotExist:
            raise UniversityNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UniversitySerializer(university, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateUniversityAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request):
        user = request.user

        data = request.data
        data._mutable = True
        data["is_active"] = True
        data._mutable = False
        

        serializer = CreateUniversitySerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"University {serializer.data.get('name')} created by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateUniversityAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def patch(self, request):
        data = request.data
        try:
            uid = data["uid"]
            university = University.objects.get(uid=uid)
        except University.DoesNotExist:
            raise UniversityNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user

        data = request.data
        serializer = UpdateUniversitySerializer(instance=university, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"University {serializer.data.get('name')} updated by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteUniversityAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def delete(self, request):
        data = request.data
        try:
            uid = data["uid"]
            university = University.objects.get(uid=uid)
        except University.DoesNotExist:
            raise UniversityNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        if request.method == "DELETE":
            delete_operation = university.delete()
            data = {}
            if delete_operation:
                data["deletion"] = "Deletion was successful"
                logger.info(f"University deleted by {user.username}")
            else:
                data["deletion"] = "Deletion was not successful"

            return Response(data=data, status=status.HTTP_200_OK)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)