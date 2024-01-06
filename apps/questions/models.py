from django.db import models
import uuid

from django.utils.translation import gettext_lazy as _
from django.utils.timezone import now

from apps.profiles.models import Profile
from apps.common.models import TimeStampedUUIDModel


class Question(models.Model):

    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    title = models.CharField(verbose_name=_("Title of the question"), max_length=63)
    short_description = models.CharField(verbose_name=_("Brief description of the question"), max_length=127)
    details = models.TextField(verbose_name=_("Details of the question"))

    subject = models.CharField(verbose_name=_("Subject from which the problem arose"), max_length=127)
    author = models.ForeignKey(Profile, verbose_name=_("An author of the question"), on_delete=models.SET_NULL,
                               null=True)

    num_views = models.IntegerField(verbose_name=_("Number of views on a question"), default=0)
    num_answers = models.IntegerField(verbose_name=_("Number of answers on a question"), default=0)

    image_1 = models.ImageField(verbose_name=_("Image 1(Optional)"), blank=True, null=True)
    image_2 = models.ImageField(verbose_name=_("Image 2(Optional)"), blank=True, null=True)
    image_3 = models.ImageField(verbose_name=_("Image 3(Optional)"), blank=True, null=True)

    date_asked = models.DateTimeField(verbose_name=_("Date asked"), default=now, editable=False)
    date_modified = models.DateTimeField(verbose_name=_("Date of last modification"), auto_now=True, editable=True)
    date_last_view = models.DateTimeField(verbose_name=_("Date of last view"), default=now, editable=True)

    solved_status = models.BooleanField(verbose_name=_("Solution status"), default=False)
    is_active = models.BooleanField(verbose_name=_("Active status"), default=True)


    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")


    def __str__(self):
        return self.title
    

class QuestionViews(TimeStampedUUIDModel):
    ip = models.CharField(verbose_name=_("IP Address"), max_length=255)
    question = models.ForeignKey(Question, related_name="question_views",
                                 on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Total views on - {self.question.title} is {self.question.num_views} view(s)"
    
    class Meta:
        verbose_name = _("Total views")
        verbose_name_plural = _("Total views")