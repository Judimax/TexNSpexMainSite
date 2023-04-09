import os
import tempfile
from app import app
import requests

import pytest

@pytest.fixture
def app_test():

    app.config.update(
      TESTING= True,
    )

    # before each


    yield app

    # after each



@pytest.fixture
def client(app_test):
    return app_test.test_client()


@pytest.fixture
def runner(app_test):
    return app_test.test_cli_runner()


# figure out to to use this for requests not interencepted by requests.mock
# @pytest.fixture(autouse=True)
# def disable_network_calls(monkeypatch):
#     def stunted_get():
#         raise RuntimeError("Network access not allowed during testing!")
#     monkeypatch.setattr(requests, "get", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "post", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "put", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "patch", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "delete", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "head", lambda *args, **kwargs: stunted_get())
#     monkeypatch.setattr(requests, "options", lambda *args, **kwargs: stunted_get())




class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='test', password='test'):
        return self._client.post(
            '/auth/login',
            data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)
