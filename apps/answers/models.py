from django.db import models
from django.utils.timezone import now
import uuid

from apps.profiles.models import Profile
from apps.questions.models import Question
from apps.common.models import TimeStampedUUIDModel

from django.utils.translation import gettext_lazy as _


class Answer(models.Model):

    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    author = models.ForeignKey(Profile, verbose_name=_("An author of the answer"), on_delete=models.SET_NULL,
                               null=True)
    question = models.ForeignKey(Question, verbose_name=_("The question that is being answered"), 
                                on_delete=models.SET_NULL, null=True)

    title = models.CharField(verbose_name=_("Title of the answer"), max_length=63, editable=True)
    description = models.TextField(verbose_name=_("Description of the solution"), editable=True)

    image_1 = models.ImageField(verbose_name=_("Image 1"), blank=True, null=True)
    image_2 = models.ImageField(verbose_name=_("Image 2"), blank=True, null=True)
    image_3 = models.ImageField(verbose_name=_("Image 3"), blank=True, null=True)
    
    date_answered = models.DateTimeField(verbose_name=_("Date answered"), default=now, editable=False)
    date_modified = models.DateTimeField(verbose_name=_("Date of last modification"), auto_now=True, editable=True)

    is_solution = models.BooleanField(verbose_name=_("Is solution"), default=False)


    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")


    def __str__(self):
        return self.title