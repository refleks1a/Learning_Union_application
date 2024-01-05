from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

import django_filters
from django_filters.rest_framework import DjangoFilterBackend

import logging

from .models import Question, QuestionViews
from .serializers import QuestionSerializer, UpdateQuestionSerializer, CreateQuestionSerializer, QuestionViewsSerializer

from apps.profiles.models import Profile

from .exceptions import NotYourQuestion, QuestionNotFound


logger = logging.getLogger(__name__)


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
    search_fields = ["title", "subject"]
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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            question = Question.objects.get(id=id)
        except Question.DoesNotExist: 
            raise QuestionNotFound   
        
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")

        if not QuestionViews.objects.filter(question=question, ip=ip).exists():
            QuestionViews.objects.create(question=question, ip=ip)
            
            question.num_views += 1
            question.save()

        serializer = QuestionSerializer(question, context={"request":request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateQuestionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateQuestionSerializer

    def patch(self, request, id):
        try:
            question = Question.objects.get(id=id)
        except Question.DoesNotExist:
            raise QuestionNotFound

        user = request.user
        author = Profile.objects.get(user=user)

        if question.author != author:
            raise NotYourQuestion
        
        data = request.data
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
           

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def UploadQuestionImage(request):
    if not request.FILES.get("image_1") and not request.FILES.get("image_2") and not request.FILES.get("image_3"):
        return Response("No images has been sent.", status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    user_profile = Profile.objects.get(user=request.user)
    
    try:
        question_id = data["question_id"]
    except KeyError:    
        return Response("The request is missing question_id", status=status.HTTP_400_BAD_REQUEST)

    try:
        question = Question.objects.get(id=question_id)
    except Question.DoesNotExist:
        raise QuestionNotFound    

    if question.author != user_profile:
        raise NotYourQuestion
    
    if request.FILES.get("image_1"):
        question.image_1 = request.FILES.get("image_1")
    if request.FILES.get("image_2"):
        question.image_2 = request.FILES.get("image_2") 
    if request.FILES.get("image_3"):
        question.image_3 = request.FILES.get("image_3") 
    question.save()        

    return Response("Image(s) uploaded!", status=status.HTTP_200_OK)  
