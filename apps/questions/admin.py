from django.contrib import admin
from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "short_description", "subject", "author",
                    "num_views", "num_answers", "date_asked", "date_last_view",
                    "solved_status", "is_active"]
    
    list_filter = ["id", "title", "num_views", "num_answers",
                   "date_asked", "date_last_view",
                   "solved_status", "is_active"]
    
    list_display_links = ["id", "title"]


admin.site.register(Question, QuestionAdmin)    