from django.contrib import admin
from .models import Answer


class AnswerAdmin(admin.ModelAdmin):
    list_display = ["id", "uid", "author", "question", "title",
                    "date_answered", "date_modified", "is_solution"]
    
    list_filter = ["id", "title", "date_answered",
                   "date_modified", "is_solution",]
    
    list_display_links = ["id" , "uid", "title"]


admin.site.register(Answer, AnswerAdmin)    