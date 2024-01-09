from __future__ import absolute_import

import os

from celery import Celery
from learning_union.settings import base


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "learning_union.settings.development")

app = Celery("learning_union")

app.config_from_object("learning_union.settings.development", namespace="CELERY"),

app.autodiscover_tasks(lambda: base.INSTALLED_APPS)
