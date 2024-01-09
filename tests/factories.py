import factory

from apps.profiles.models import Profile
from apps.majors.models import Major
from apps.universities.models import University

from django.db.models.signals import post_save
from faker import Factory as FakerFactory
from learning_union.settings.base import AUTH_USER_MODEL


faker = FakerFactory.create()


@factory.django.mute_signals(post_save)
class ProfileFactory(factory.django.DjangoModelFactory):
    user = factory.SubFactory("tests.factories.UserFactory")
    phone_number = factory.LazyAttribute(lambda x: faker.phone_number())
    about_me = factory.LazyAttribute(lambda x: faker.sentence(nb_words=5))
    profile_photo = factory.LazyAttribute(
        lambda x: faker.file_extension(category="image")
    )
    gender = factory.LazyAttribute(lambda x: f"other")
    country = factory.LazyAttribute(lambda x: faker.country_code())
    city = factory.LazyAttribute(lambda x: faker.city())
    university = factory.SubFactory("tests.factories.UniversityFactory")
    major = factory.SubFactory("tests.factories.MajorFactory")
    education_language = factory.LazyAttribute(lambda x: f"AZ")
    year_of_study = factory.LazyAttribute(lambda x: faker.random_int(min=1, max=5))
    degree_type = factory.LazyAttribute(lambda x: f"Bch")
    is_student = False
    is_teacher = False
    is_other = False
    top_helper = False
    rating = factory.LazyAttribute(lambda x: faker.random_int(min=1, max=5))
    num_reviews = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=25))

    class Meta:
        model = Profile


@factory.django.mute_signals(post_save)
class UserFactory(factory.django.DjangoModelFactory):
    username = factory.LazyAttribute(lambda x: f"mike123")
    first_name = factory.LazyAttribute(lambda x: faker.first_name())
    last_name = factory.LazyAttribute(lambda x: faker.last_name())
    fathers_name = factory.LazyAttribute(lambda x: f"Ramil")
    email = factory.LazyAttribute(lambda x: f"alpha@lu.com")
    password = factory.LazyAttribute(lambda x: faker.password())
    is_active = True
    is_staff = False

    class Meta:
        model = AUTH_USER_MODEL

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)
        if "is_superuser" in kwargs:
            return manager.create_superuser(*args, **kwargs)
        else:
            return manager.create_user(*args, **kwargs)
        

class UniversityFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: f"ADA")
    date_created = factory.LazyAttribute(lambda x: faker.date())        
    country = factory.LazyAttribute(lambda x: faker.country_code())
    city = factory.LazyAttribute(lambda x: faker.city())
    num_teachers = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=10000))
    num_students = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=10000))
    phone_number = factory.LazyAttribute(lambda x: faker.phone_number())
    rector = factory.LazyAttribute(lambda x: f"{faker.first_name()} {faker.last_name()}")
    description = factory.LazyAttribute(lambda x: faker.sentence(nb_words=5))
    num_students_registered = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=10000))
    num_teachers_registered = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=10000))
    activity_lvl = factory.LazyAttribute(lambda x: f"1")
    is_active = True

    class Meta:
        model = University


class MajorFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: f"Computer Science")
    num_students = factory.LazyAttribute(lambda x: faker.random_int(min=0, max=2000))

    class Meta:
        model = Major