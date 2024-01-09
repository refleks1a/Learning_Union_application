import pytest
from apps.profiles.exceptions import ProfileNotFound, NotYourProfile


def test_profile_not_found_status_code():
    exception = ProfileNotFound()
    assert exception.status_code == 404

def test_profile_not_found_default_detail():
    exception = ProfileNotFound()
    assert exception.default_detail == "The requested profile doesn't exist!"

def test_not_your_profile_status_code():
    exception = NotYourProfile()
    assert exception.status_code == 403

def test_not_your_profile_default_detail():
    exception = NotYourProfile()
    expected_detail = "You cannot edit other person's profile"
    assert exception.default_detail == expected_detail
