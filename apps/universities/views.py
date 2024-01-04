from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import logging

from .models import University
from .serializers import UniversitySerializer, CreateUniversitySerializer, UpdateUniversitySerializer
from .exceptions import UniversityNotFound


logger = logging.getLogger(__name__)


class UniversitiesListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class UniversityAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, name):
        try:
            university =  University.objects.get(name=name)
        except University.DoesNotExist:
            raise UniversityNotFound
        
        serializer = UniversitySerializer(university, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class MostActiveUniversitiesAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            most_active_universities = University.objects.order_by("activity_lvl" ,"num_students_registered",
                "num_teachers_registered", "international_ranking","local_ranking")[:5]
        except University.DoesNotExist:
            raise UniversityNotFound
        
        serializer = UniversitySerializer(most_active_universities, context={"request":request}, many=True)

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

    def patch(self, request, name):
        try:
            university = University.objects.get(name=name)
        except University.DoesNotExist:
            raise UniversityNotFound
        
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

    def delete(self, request, name):
        try:
            university = University.objects.get(name=name)
        except University.DoesNotExist:
            raise UniversityNotFound

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