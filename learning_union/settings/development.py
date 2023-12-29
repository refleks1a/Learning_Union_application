from .base import *


DATABASES = {
    'default': {
        'ENGINE': env("MYSQL_ENGINE"),
        'NAME': env("MYSQL_NAME"),
        'USER': env("MYSQL_USER"),
        'PASSWORD': env("MYSQL_PASSWORD"),
        'HOST': env("MYSQL_HOST"),
        'PORT': env("MYSQL_PORT"),
        'OPTIONS': {  
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"  
        },
    }
}