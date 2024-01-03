from django.contrib import admin
from .models import Answer


class AnswerAdmin(admin.ModelAdmin):
    list_display = ["id", "author", "question", "title",
                    "date_answered", "date_modified",
                    "is_solution"]
    
    list_filter = ["id", "title", "is_solution",
                   "date_answered", "date_modified"]
    
    list_display_links = ["id" , "title"]


admin.site.register(Answer, AnswerAdmin)    