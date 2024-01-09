import pytest
from pytest_factoryboy import register

from tests.factories import ProfileFactory, UserFactory, UniversityFactory, MajorFactory


register(ProfileFactory)
register(UserFactory)
register(UniversityFactory)
register(MajorFactory)


@pytest.fixture
def base_user(db, user_factory):
    new_user = user_factory.create()
    return new_user


@pytest.fixture
def super_user(db, user_factory):
    new_user = user_factory.create(is_staff=True, is_superuser=True)
    return new_user


@pytest.fixture
def profile(db, profile_factory):
    user_profile = profile_factory.create()
    return user_profile


@pytest.fixture
def university(db, university_factory):
    new_university = university_factory.create()
    return new_university

    
@pytest.fixture
def major(db, major_factory):
    new_major = major_factory.create()
    return new_major
