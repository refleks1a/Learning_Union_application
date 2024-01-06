from django.db import models
import uuid

from django.utils.translation import gettext_lazy as _


class Major(models.Model):

    class Meta:
        verbose_name = _("Major")
        verbose_name_plural = _("Majors")

    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(verbose_name=_("Name of the major"), max_length=255)
    num_students = models.IntegerField(verbose_name=_("Number of students with this major"),
        default=0)