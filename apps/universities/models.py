from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField


class University(models.Model):

    class Range(models.IntegerChoices):
        LVL_1 = 1, _("Poor")
        LVL_2 = 2, _("Fair")
        LVL_3 = 3, _("Good")
        LVL_4 = 4, _("Very good")
        LVL_5 = 5, _("Excellent")

    class Meta:
        verbose_name = _("University")  
        verbose_name_plural = _("Universities")  
    
    name = models.CharField(verbose_name=_("University Name"), max_length=255)
    short_name = models.CharField(verbose_name=_("Sort name of the University(if exists)"), max_length=15,
        blank=True, null=True)
    date_created = models.DateField(verbose_name=_("Date of creation"))

    country = CountryField(verbose_name=_("Country"), default="AZ",
                            blank=False, null=False)
    city = models.CharField(verbose_name=_("City"), default="Baku",
                            max_length=127, blank=False, null=False)
    address = models.CharField(verbose_name=_("Address of the university"), max_length=255)

    num_teachers = models.IntegerField(verbose_name=_("Number of teachers in the university"), default=0)
    num_students = models.IntegerField(verbose_name=_("Number of students in the university"), default=0)
    head_organization = models.CharField(verbose_name=_("Head organization(if exists)"), max_length=127,
        blank=True, null=True)
    phone_number = PhoneNumberField(verbose_name=_("Phone number"),
                                    max_length=30, default="+000000000000")
    rector = models.CharField(verbose_name=_("Rector o the university"), max_length=127)
    website = models.CharField(verbose_name=_("Website of the university(if exists)"), max_length=127,
        blank=True, null=True)
    description = models.TextField(verbose_name=_("Description"))

    international_ranking = models.IntegerField(verbose_name=_("International ranking(if exists)"),
        blank=True, null=True)
    local_ranking = models.IntegerField(verbose_name=_("Local ranking(if exists)"),
        blank=True, null=True)
    
    num_students_registered = models.IntegerField(verbose_name=_("Number of students registered from this university"),
        default=0, blank=True, null=True)
    num_teachers_registered = models.IntegerField(verbose_name=_("Number of teachers registered from this university"),
        default=0, blank=True, null=True)
    
    activity_lvl = models.IntegerField(verbose_name=_("Activity level of the university on the website"), 
        choices=Range.choices, default=0, help_text=_("1=Poor, 2=Fair, 3=Good, 4=Very good, 5=excellent"))
    
    is_active = models.BooleanField(default=False)