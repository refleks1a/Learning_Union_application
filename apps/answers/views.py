from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

from django.core.exceptions import ValidationError
from django.core.mail import send_mail

from learning_union.settings.development import DEFAULT_FROM_EMAIL

import logging

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.timezone import now

from .models import Answer
from .serializers import AnswerSerializer, UpdateAnswerSerializer, CreateAnswerSerializer, UpdateIsSolutionSerializer
from .exceptions import AnswerNotFound, NotYourAnswer, PermissionDenied, MissingAnswerID, MissingID, MissingImageNum

from apps.questions.models import Question
from apps.questions.exceptions import QuestionNotFound

from apps.profiles.models import Profile
from apps.profiles.exceptions import ProfileNotFound


logger = logging.getLogger(__name__)

# Filters of the Answer model
class AnswerFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(
        field_name="title", lookup_expr="contains"
    )
    description = django_filters.CharFilter(
        field_name="description", lookup_expr="contains"
    )
    is_solution = django_filters.BooleanFilter(field_name="is_solution")

    class Meta:
        model = Answer
        fields = ["title", "description", "is_solution"]


class GetAnswersOnQuestionAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AnswerSerializer
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = AnswerFilter
    search_fields = ["uid", "title", "description","author.user.username", 
                     "author.user.get_full_name"]
    ordering_fields = ["date_answered", "date_modified"]
    
    def get_queryset(self):
        data = self.request.data
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist:
            raise QuestionNotFound
        except ValidationError:
            raise MissingID

        try:
            answers = Answer.objects.filter(question=question)
        except Answer.DoesNotExist:
            raise AnswerNotFound
        
        queryset = answers.order_by("-date_modified")
        return queryset
    

class GetUsersAnswersAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AnswerSerializer
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = AnswerFilter
    search_fields = ["uid", "title", "description"]
    ordering_fields = ["date_answered", "date_modified"]

    def get_queryset(self):
        try:
            user = self.request.user
            user_profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        try:
            answers = Answer.objects.filter(author=user_profile)
        except Answer.DoesNotExist:
            raise AnswerNotFound    
            
        return answers


class GetAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = request.data
        try:
            uid = data["uid"]
            answer = Answer.objects.get(uid=uid)
        except Answer.DoesNotExist:
            raise AnswerNotFound 
        except ValidationError:
            return Response("Not valid uid")

        serializer = AnswerSerializer(answer, context={"request": request})   

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateAnswerSerializer

    def patch(self, request):
        data = request.data
        try:
            uid = data["uid"]
            answer = Answer.objects.get(uid=uid)
        except Answer.DoesNotExist:
            raise AnswerNotFound
        except ValidationError:
            return Response("Not valid uid")

        user = request.user
        author = Profile.objects.get(user=user)

        if answer.author != author:
            raise NotYourAnswer
        
        data = request.data
        answer.date_modified = now()
        answer.save()

        serializer = UpdateAnswerSerializer(instance=answer, data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreteAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        user_profile = Profile.objects.get(user=user)
        data = request.data
        
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist:
            raise QuestionNotFound  
        except ValidationError:
            return Response("Not valid uid")
  

        data._mutable = True
        data["author"] = user_profile.pkid
        data["question"] = question.pk
        data["date_answered"] = now()
        data._mutable = False

        serializer = CreateAnswerSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            question.num_answers += 1
            question.save() 

            user_profile.num_reviews += 1
            user_profile.save()

            logger.info(f"question {serializer.data.get('title')} created by {user.username}")

            # Sending email to the author of the question
            subject = f"{user.username} has answered your question!"
            message = f"{user.get_full_name} has answered your question with the title: {question.title}"
            from_email = DEFAULT_FROM_EMAIL
            recipient_list = [user.email]

            send_mail(
                subject, message, from_email,
                recipient_list, fail_silently=True
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        data = request.data

        try:
            uid = data["uid"]
            answer = Answer.objects.get(uid=uid)
        except Answer.DoesNotExist:
            raise AnswerNotFound
        except ValidationError:
            return Response("Not valid uid")

        user = request.user
        user_profile = Profile.objects.get(user=user)

        if answer.author != user_profile:
            raise NotYourAnswer 
        
        if request.method == "DELETE":
            delete_operation = answer.delete()
            data = {}
            if delete_operation:
                data["deletion"] = "Deletion was successful"

                # Decrement the number of answers on the question
                answer.question.num_answers -= 1
                answer.question.save()

                # Increment the number of answers on the question
                user_profile.num_reviews -= 1
                user_profile.save()
            else:
                data["deletion"] = "Deletion was not successful"

            return Response(data=data, status=status.HTTP_200_OK)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class IsSolutionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        data = request.data

        try:
            uid = data["uid"]
            answer = Answer.objects.get(uid=uid)
        except Answer.DoesNotExist:
            raise AnswerNotFound  
        except ValidationError:
            return Response("Not valid uid")  

        user = request.user
        user_profile = Profile.objects.get(user=user)

        if answer.question.author != user_profile:
            raise PermissionDenied

        data = request.data

        # If the answer is the solution then question is marked as solved
        if data["is_solution"] == "True" and not answer.question.solved_status:
            answer.question.solved_status = True
            answer.question.save()
        # If the answer is not the solution then question is marked as not solved    
        elif data["is_solution"] == "False" and not Answer.objects.filter(is_solution=True).exclude(uid=uid):
            answer.question.solved_status = False
            answer.question.save()
    
        serializer = UpdateIsSolutionSerializer(instance=answer, data=data, partial=True)

        serializer.is_valid()
        serializer.save()

        return Response(serializer.errors, status=status.HTTP_200_OK)
    

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def UploadAnswerImage(request):
    # Check that at least is uploaded
    if not request.FILES.get("image_1") and not request.FILES.get("image_2") and not request.FILES.get("image_3"):
        return Response("No images has been sent.", status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    user_profile = Profile.objects.get(user=request.user)
    
    try:
        answer_uid = data["uid"]
    except KeyError:    
        raise MissingAnswerID
    except ValidationError:
            return Response("Not valid uid")

    try:
        answer = Answer.objects.get(uid=answer_uid)
    except Answer.DoesNotExist:
        raise AnswerNotFound    

    if answer.author != user_profile:
        raise NotYourAnswer
        
    # Check what image is being uploaded    
    if request.FILES.get("image_1"):
        answer.image_1 = request.FILES.get("image_1")
    if request.FILES.get("image_2"):
        answer.image_2 = request.FILES.get("image_2") 
    if request.FILES.get("image_3"):
        answer.image_3 = request.FILES.get("image_3") 
    answer.save()        

    return Response("Image(s) uploaded!", status=status.HTTP_200_OK)


class DeleteAnswerImageAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        data = request.data
        
        try:
            uid = data["uid"]
            answer = Answer.objects.get(uid=uid)
        except Answer.DoesNotExist:
            raise AnswerNotFound
        except KeyError:
            raise MissingID
        except ValidationError:
            return Response("Not valid uid")

        try:
            image_num = data["image_num"]
        except KeyError:
            raise MissingImageNum
        
        user_profile = Profile.objects.get(user=request.user)
        if answer.author != user_profile:
            raise NotYourAnswer
        
        deletion_status = False
        
        # Check which image is being deleted
        if image_num == "1" and answer.image_1:
            answer.image_1.delete()
            deletion_status = True    
        elif image_num == "2" and answer.image_2:
            answer.image_2.delete()
            deletion_status = True
        elif image_num == "3" and answer.image_3:
            answer.image_3.delete()   
            deletion_status = True
        elif (image_num == "1" and not answer.image_1) or (image_num == "2" and not answer.image_2) or (image_num == "3" and not answer.image_3):
            return Response("There is no image to delete.", status=status.HTTP_400_BAD_REQUEST)
        
        answer.save()

        if deletion_status:
            return Response("Image deletion was successful", status=status.HTTP_200_OK)     
        return Response("Image deletion failed", status=status.HTTP_409_CONFLICT)
            
