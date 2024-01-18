from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel
from apps.majors.models import Major
from apps.universities.models import University


User = get_user_model()


class Gender(models.TextChoices):
    MALE = "Male", _("Male")
    FEMALE = "Female", _("Female")
    OTHER = "Other", _("Other")

class Edu_Language(models.TextChoices):
    AZ = "AZE", _("Azerbaijani")
    RU = "RUS", _("Russian")
    EN = "ENG", _("English")
    FR = "FR", _("French")
    OTHER = "OTHER", _("Other")

class Degree_Type(models.TextChoices):
    Bachelor = "Bachelor", _("Bachelor's degree") 
    Masters = "Masters", _("Masters's degree") 
    PHD = "PHD", _("PHD")
    

class Profile(TimeStampedUUIDModel):

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    user = models.OneToOneField(User, related_name="profile",
                                on_delete=models.CASCADE)
    phone_number = PhoneNumberField(verbose_name=_("Phone number"),
                                    max_length=30, default="+000000000000")
    about_me = models.TextField(verbose_name=_("About me"), default="Something about yourself...")
    profile_photo = models.ImageField(verbose_name=_("Profile photo"), default="/profile_default.png")
    gender = models.CharField(verbose_name=_("Gender"), choices=Gender.choices,
                              default=Gender.OTHER, max_length=31)
    
    country = CountryField(verbose_name=_("Country"), default="AZ",
                            blank=False, null=False)
    city = models.CharField(verbose_name=_("City"), default="Baku",
                            max_length=127, blank=False, null=False)
    
    university = models.ForeignKey(University, related_name="university",
                            on_delete=models.CASCADE, blank=True, null=True)
    major = models.ForeignKey(Major, related_name="major",
                            on_delete=models.CASCADE, blank=True, null=True)
    
    education_language=models.CharField(verbose_name=_("Language of education"), choices=Edu_Language.choices,
        default="AZE", help_text=_("Main language of education"), max_length=255)
    year_of_study = models.IntegerField(verbose_name=_("Year of study"), default=1, blank=True, null=True)
    degree_type = models.CharField(verbose_name=_("Type of degree"), max_length=255, help_text=_("Bachelors, Masters, PHD ..."),
                                   choices = Degree_Type.choices, blank=True, null=True)

    is_student = models.BooleanField(verbose_name=_("Student"), default=False,
                                help_text=_("Are you a student"))
    is_teacher = models.BooleanField(verbose_name=_("Teacher"), default=False,
                                    help_text=_("Are you a teacher?"))
    is_other = models.BooleanField(verbose_name=_("Other"), default=False,
                                   help_text=_("You are neither teacher nor student"))
    
    top_helper = models.BooleanField(verbose_name=_("Top helper"), default=False)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(verbose_name=_("Number of reviews"), default=0,
                                      null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    