from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "pkid", "user", "gender",
                    "phone_number", "country", "city",
                    "university", "major"]
    list_filter = ["gender", "country", "city",
                "university", "major", "year_of_study",
                "degree_type", "education_language",
                "is_student", "is_teacher", "is_other",
                "rating", "num_reviews"]
    list_display_links = ["id", "pkid", "user"]


admin.site.register(Profile, ProfileAdmin)