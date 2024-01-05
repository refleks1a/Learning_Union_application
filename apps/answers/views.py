from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import logging

from .models import Answer
from .serializers import AnswerSerializer, UpdateAnswerSerializer, CreateAnswerSerializer, UpdateIsSolutionSerializer
from .exceptions import AnswerNotFound, NotYourAnswer, PermissionDenied

from apps.questions.models import Question
from apps.questions.exceptions import QuestionNotFound

from apps.profiles.models import Profile
from apps.profiles.exceptions import ProfileNotFound


logger = logging.getLogger(__name__)


class GetAnswersOnQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise QuestionNotFound
        try:
            question = Question.objects.get(id=id)
            Answer.objects.filter(question=question)
        except Answer.DoesNotExist:
            raise AnswerNotFound

        question = Question.objects.get(id=id)
        answers = Answer.objects.filter(question=question)
        
        serializer = AnswerSerializer(answers, context={"request":request}, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class GetUsersAnswersAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            user_profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        try:
            Answer.objects.filter(author=user_profile)
        except Answer.DoesNotExist:
            raise AnswerNotFound    
            

        user = request.user
        user_profile = Profile.objects.get(user=user)

        answers = Answer.objects.filter(author=user_profile)
        serializer = AnswerSerializer(answers, context={"request": request}, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GetAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            raise AnswerNotFound 

        answer = Answer.objects.get(id=id)
        serializer = AnswerSerializer(answer, context={"request": request})   

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateAnswerSerializer

    def patch(self, request, id):
        try:
            Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            raise AnswerNotFound

        user = request.user
        author = Profile.objects.get(user=user)

        if Answer.objects.get(id=id).author != author:
            raise NotYourAnswer
        
        data = request.data
        serializer = UpdateAnswerSerializer(instance=Answer.objects.get(id=id), data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class IsSolutionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, id):
        try:
            answer = Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            raise AnswerNotFound    

        user = request.user
        user_profile = Profile.objects.get(user=user)

        if answer.question.author != user_profile:
            raise PermissionDenied

        data = request.data

        if data["is_solution"] == "True" and not answer.question.solved_status:
            answer.question.solved_status = True
            answer.question.save()
        elif data["is_solution"] == "False" and not Answer.objects.filter(is_solution=True).exclude(id=id):
            answer.question.solved_status = False
            answer.question.save()
    
        serializer = UpdateIsSolutionSerializer(instance=answer, data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.errors, status=status.HTTP_200_OK)


class CreteAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id):
        user = request.user
        user_profile = Profile.objects.get(user=user)
        
        try:
            question = Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise QuestionNotFound    

        data = request.data
        data._mutable = True
        data["author"] = user_profile.pkid
        data["question"] = question.pk
        data._mutable = False

        serializer = CreateAnswerSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"question {serializer.data.get('title')} created by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, id):
        try:
            answer = Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            raise AnswerNotFound

        user = request.user
        user_profile = Profile.objects.get(user=user)

        if answer.author != user_profile:
            raise NotYourAnswer 
        
        if request.method == "DELETE":
            delete_operation = answer.delete()
            data = {}
            if delete_operation:
                data["deletion"] = "Deletion was successful"
            else:
                data["deletion"] = "Deletion was not successful"

            return Response(data=data, status=status.HTTP_200_OK)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
