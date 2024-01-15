from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.exceptions import ValidationError
import logging

from .models import Major
from .serializers import MajorSerializer, CreateMajorSerializer, UpdateMajorSerializer
from .exceptions import MajorNotFound
from .pagination import MajorPagination


logger = logging.getLogger(__name__)


class MajorsListAPIView(generics.ListAPIView):
    queryset = Major.objects.all()
    pagination_class = MajorPagination
    serializer_class = MajorSerializer


class MajorAPIView(APIView):

    def get(self, request, uid):
        try:
            major = Major.objects.get(uid=uid)
        except Major.DoesNotExist:
            raise MajorNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)

        serializer = MajorSerializer(major, context={"request":request}) 

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateMajorAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request):
        user = request.user

        data = request.data

        serializer = CreateMajorSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"Major {serializer.data.get('name')} created by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateMajorAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def patch(self, request, uid):
        try:
            major = Major.objects.get(uid=uid)
        except Major.DoesNotExist:
            raise MajorNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user

        data = request.data
        serializer = UpdateMajorSerializer(instance=major, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"Major {serializer.data.get('name')} updated by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteMajorAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def delete(self, request, uid):
        try:
            university = Major.objects.get(uid=uid)
        except Major.DoesNotExist:
            raise MajorNotFound
        except ValidationError:
            return Response("Not valid uid", status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        if request.method == "DELETE":
            delete_operation = university.delete()
            data = {}
            if delete_operation:
                data["deletion"] = "Deletion was successful"
                logger.info(f"Major deleted by {user.username}")
            else:
                data["deletion"] = "Deletion was not successful"

            return Response(data=data, status=status.HTTP_200_OK)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    