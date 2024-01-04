from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),

    path("api/v1/profile/", include("apps.profiles.urls")),
    path("api/v1/questions/", include("apps.questions.urls")),
    path("api/v1/answers/", include("apps.answers.urls")),
    path("api/v1/universities/", include("apps.universities.urls")),
    path("api/v1/majors/", include("apps.majors.urls")),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


admin.site.site_header = "Learning Union Admin"
admin.site.site_title = "Learning Union Admin Portal"
admin.site.index_title = "Welcome to the Learning Union Portal"