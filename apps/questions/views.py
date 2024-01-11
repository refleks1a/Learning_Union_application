from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.timezone import now

from django.core.exceptions import ValidationError

import logging

from .pagination import QuestionPagination
from .models import Question, QuestionViews
from .serializers import QuestionSerializer, UpdateQuestionSerializer, CreateQuestionSerializer, QuestionViewsSerializer

from apps.profiles.models import Profile

from .exceptions import NotYourQuestion, QuestionNotFound, MissingID, MissingImageNum, MissingQuestionID


logger = logging.getLogger(__name__)


# Filters on Question model
class QuestionFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(
        field_name="title", lookup_expr="icontains"
    )
    subject = django_filters.CharFilter(
        field_name="subject", lookup_expr="icontains"
    )
    solved_status = django_filters.BooleanFilter(field_name="solved_status")
    is_active = django_filters.BooleanFilter(field_name="is_active")
    num_views_gte = django_filters.NumberFilter(
        field_name="num_views", lookup_expr="gte"
    )
    num_views_lte = django_filters.NumberFilter(
        field_name="num_views", lookup_expr="lte"
    )
    num_answers_gte = django_filters.NumberFilter(
        field_name="num_answers", lookup_expr="gte"
    )
    num_answers_lte = django_filters.NumberFilter(
        field_name="num_answers", lookup_expr="lte"
    )

    class Meta:
        model = Question
        fields = ["title", "subject"]


class GetQuestionsListAPIView(generics.ListAPIView):
    queryset = Question.objects.all().order_by("-date_asked")
    serializer_class = QuestionSerializer
    pagination_class = QuestionPagination
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = QuestionFilter

    search_fields = ["author.user.username", "author.user.get_full_name",
                     "author.user.get_short_name", "title", "subject"]
    ordering_fields = ["date_asked", "num_views", "num_answers"]


class GetUsersQuestionsAPIView(generics.ListAPIView):
    serializer_class = QuestionSerializer 
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filterset_class = QuestionFilter
    search_fields = ["title", "subject", "uid"]
    ordering_fields = ["date_asked", "num_views", "num_answers"]

    def get_queryset(self):
        user = self.request.user
        user_profile = Profile.objects.get(user=user)
        
        queryset = Question.objects.filter(author=user_profile).order_by("-date_asked")
        return queryset


class QuestionViewsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuestionViewsSerializer
    queryset = QuestionViews.objects.all()


class GetQuestionAPIView(APIView):

    def get(self, request):
        data = request.data
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist: 
            raise QuestionNotFound   
        except ValidationError:
            return Response("Not valid uid")

        # Get the IP address of the user
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")

        # If the user views the question for the first time create a question view
        if not QuestionViews.objects.filter(question=question, ip=ip).exists():
            QuestionViews.objects.create(question=question, ip=ip)
            question.date_last_view = now()
            question.num_views += 1
            question.save()

        serializer = QuestionSerializer(question, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateQuestionSerializer

    def patch(self, request):
        data = request.data
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist:
            raise QuestionNotFound
        except ValidationError:
            return Response("Not valid uid")

        user = request.user
        author = Profile.objects.get(user=user)

        if question.author != author:
            raise NotYourQuestion
        
        # Change the date of modification of the question
        data = request.data
        data._mutable = True
        data["date_modified"] = now()
        data._mutable = False
        serializer = UpdateQuestionSerializer(instance=question, data=data, partial=True)

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
        data["date_asked"] = now()
        data._mutable = False

        serializer = CreateQuestionSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"question {serializer.data.get('title')} created by {user.username}")

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        data = request.data
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist:
            raise QuestionNotFound
        except ValidationError:
            return Response("Not valid uid")

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
           

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def UploadQuestionImage(request):
    if not request.FILES.get("image_1") and not request.FILES.get("image_2") and not request.FILES.get("image_3"):
        return Response("No images has been sent.", status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    user_profile = Profile.objects.get(user=request.user)
    
    try:
        uid = data["uid"]
    except KeyError:    
        raise MissingQuestionID
    except ValidationError:
            return Response("Not valid uid")

    try:
        question = Question.objects.get(uid=uid)
    except Question.DoesNotExist:
        raise QuestionNotFound    

    if question.author != user_profile:
        raise NotYourQuestion
    
    # Check witch image is being loaded
    if request.FILES.get("image_1"):
        question.image_1 = request.FILES.get("image_1")
    if request.FILES.get("image_2"):
        question.image_2 = request.FILES.get("image_2") 
    if request.FILES.get("image_3"):
        question.image_3 = request.FILES.get("image_3") 
    question.save()        

    return Response("Image(s) uploaded!", status=status.HTTP_200_OK)  


class DeleteQuestionImageAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        data = request.data
        
        try:
            uid = data["uid"]
            question = Question.objects.get(uid=uid)
        except Question.DoesNotExist:
            raise QuestionNotFound
        except KeyError:
            raise MissingID
        except ValidationError:
            return Response("Not valid uid")

        try:
            image_num = data["image_num"]
        except KeyError:
            raise MissingImageNum
        
        user_profile = Profile.objects.get(user=request.user)
        if question.author != user_profile:
            raise NotYourQuestion
        
        # Check which image is being deleted
        deletion_status = False
        if image_num == "1" and question.image_1:
            question.image_1.delete()
            deletion_status = True    
        elif image_num == "2" and question.image_2:
            question.image_2.delete()
            deletion_status = True
        elif image_num == "3" and question.image_3:
            question.image_3.delete()   
            deletion_status = True
        elif (image_num == "1" and not question.image_1) or (image_num == "2" and not question.image_2) or (image_num == "3" and not question.image_3):
            return Response("There is no image to delete.", status=status.HTTP_400_BAD_REQUEST)
        
        question.save()

        if deletion_status:
            return Response("Image deletion was successful", status=status.HTTP_200_OK)     
        return Response("Image deletion failed", status=status.HTTP_409_CONFLICT)
            
