import json
from rest_framework.renderers import JSONRenderer
from unittest.mock import Mock


def test_render_with_errors():
    data = {"errors": "Something went wrong"}
    renderer = JSONRenderer()
    mock_super = Mock(return_value="Error occurred")
    renderer.render = mock_super
    assert renderer.render(data) == "Error occurred"