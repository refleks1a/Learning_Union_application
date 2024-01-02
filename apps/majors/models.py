from django.db import models
from django.utils.translation import gettext_lazy as _


class Major(models.Model):

    class Meta:
        verbose_name = _("Major")
        verbose_name_plural = _("Majors")

    name = models.CharField(verbose_name=_("Name of the major"), max_length=255)
    num_students = models.IntegerField(verbose_name=_("Number of students with this major"),
        default=0)