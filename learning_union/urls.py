from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


admin.site.site_header = "Learning Union Admin"
admin.site.site_title = "Learning Union Admin Portal"
admin.site.index_title = "Welcome to the Learning Union Portal"