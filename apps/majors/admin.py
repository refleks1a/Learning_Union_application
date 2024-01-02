from django.contrib import admin
from .models import Major


class MajorAdmin(admin.ModelAdmin):
    list_display = ["name", "num_students"]
    list_filter = ["name", "num_students"]


admin.site.register(Major, MajorAdmin)