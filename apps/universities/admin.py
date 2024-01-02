from django.contrib import admin
from .models import University


class UniversityAdmin(admin.ModelAdmin):
    list_display = ["id", "short_name", "country", "city",
                    "num_teachers", "num_students", "phone_number",
                    "website", "description",
                    "num_students_registered", "num_teachers_registered",
                    "activity_lvl", "is_active"]
    
    list_filter = ["id", "name", "date_created", "country", "city",
                   "num_teachers", "num_students",
                   "international_ranking", "local_ranking",
                    "num_students_registered", "num_teachers_registered",
                    "activity_lvl", "is_active"]
    
    list_display_links = ["id", "short_name"]


admin.site.register(University, UniversityAdmin)