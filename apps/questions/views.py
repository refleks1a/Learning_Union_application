from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import logging

from .models import Question
from .serializers import QuestionSerializer, UpdateQuestionSerializer, CreateQuestionSerializer

from apps.profiles.models import Profile

from .exceptions import NotYourQuestion, QuestionNotFound


logger = logging.getLogger(__name__)


class GetQuestionsListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class GetSolvedQuestionsAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Question.objects.filter(solved_status=True)
    serializer_class = QuestionSerializer


class GetUsersQuestionsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user
        user_profile = Profile.objects.get(user=user)

        questions = Question.objects.filter(author=user_profile)
        serializer = QuestionSerializer(questions, context={"request":request}, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            Question.objects.get(id=id)
        except Question.DoesNotExist: 
            raise QuestionNotFound   

        question = Question.objects.get(id=id)
        serializer = QuestionSerializer(question, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateQuestionSerializer

    def patch(self, request, id):
        try:
            Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise QuestionNotFound

        user = request.user
        author = Profile.objects.get(user=user)

        if Question.objects.get(id=id).author != author:
            raise NotYourQuestion
        
        data = request.data
        serializer = UpdateQuestionSerializer(instance=Question.objects.get(id=id), data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CreateQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        user_profile = Profile.objects.get(user=user)
        
        data = request.data
        data._mutable = True
        data["author"] = user_profile.pkid
        data._mutable = False

        serializer = CreateQuestionSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"question {serializer.data.get('title')} created by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, id):
        try:
            question = Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise QuestionNotFound

        user = request.user
        user_profile = Profile.objects.get(user=user)

        if question.author != user_profile:
            raise NotYourQuestion 
        
        if request.method == "DELETE":
            delete_operation = question.delete()
            data = {}
            if delete_operation:
                data["deletion"] = "Deletion was successful"
            else:
                data["deletion"] = "Deletion was not successful"

            return Response(data=data, status=status.HTTP_200_OK)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
           
