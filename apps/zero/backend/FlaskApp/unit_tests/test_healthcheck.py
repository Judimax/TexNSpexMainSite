from pydoc import cli
from configs import CONFIGS
import pytest

def test_healthcheck(client):
  response = client.get('/healthz/')
  assert CONFIGS.endpointMsgCodes["success"]  == response.json['code']
  assert "A-OK"  == response.json['msg']
  
def test_mytest_healthcheck(client,requests_mock):
  response = client.get('/healthz/test')
  assert CONFIGS.endpointMsgCodes["success"]  == response.json['code']
  assert "http://localhost/healthz/test"  == response.json['msg']  