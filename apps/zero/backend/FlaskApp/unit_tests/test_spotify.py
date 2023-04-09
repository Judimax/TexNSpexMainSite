

import ast
from urllib import response
from urllib.parse import parse_qs, urlencode, urlparse
from my_util import turn_query_params_to_object,turn_cookie_to_object
from configs import CONFIGS
from spotify import client_redirect_url,state_key,get_user_info,get_users_playlists_spotify

access_token = 'A'
playlist_id = 1
user_id = 101
def test_client_redirect_url():
  assert "http://localhost/spotify/login_callback" ==  client_redirect_url("http://localhost")


def test_authorize_app_to_access_end_user_acct(client):

    response = client.get("spotify/login")
    parsed_redirect_query = turn_query_params_to_object(response.location)
    assert parsed_redirect_query['show_dialog'] == str(CONFIGS.spotify["show_dialog_to_change_spotify_user_acct"])
    assert parsed_redirect_query['response_type'] == 'code'
    assert parsed_redirect_query['client_id'] == CONFIGS.spotify['client_id']
    assert parsed_redirect_query['scope'] ==CONFIGS.spotify["client_scope"]
    assert parsed_redirect_query['redirect_uri']  ==client_redirect_url(CONFIGS.app['domain_name'])
    assert response.status_code == 302


    cookie_attrs = turn_cookie_to_object(response.headers.getlist('Set-Cookie'),state_key)
    assert cookie_attrs is not None
    assert 'Secure' in cookie_attrs
    assert 'HttpOnly' in cookie_attrs
    assert cookie_attrs['Domain'] == CONFIGS.app['frontend_angular_app_domain']



def test_take_actions_after_spotify_authorization_request(client,monkeypatch):
  def fake_get_refresh_and_access_token(val):
    return {
      'access_token':'A',
      'refresh_token':'B'
    }
  monkeypatch.setattr('spotify.get_refresh_and_access_token', fake_get_refresh_and_access_token)
  response = client.get("spotify/login_callback?code=1&state=2")
  parsed_redirect_query = turn_query_params_to_object(response.location)

  assert parsed_redirect_query['spotify_access_token'] == 'A'

  cookie_attrs = turn_cookie_to_object(response.headers.getlist('Set-Cookie'),'spotify_refresh_token')
  assert cookie_attrs is not None
  assert cookie_attrs['spotify_refresh_token'] == 'B'
  assert 'Secure' in cookie_attrs
  assert 'HttpOnly' in cookie_attrs
  assert cookie_attrs['Domain'] == CONFIGS.app['frontend_angular_app_domain']
  assert cookie_attrs['SameSite'] == 'Lax'

def test_add_item_to_playlist_spotify(client,requests_mock):

  access_token = 'A'
  playlist_id = 1
  item_id = 2
  url = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)
  headers = {"Authorization": "Bearer {}".format(access_token)}
  spotify_req_body = {
    'uris':[
      item_id
    ]
  }
  requests_mock.post(url=url,headers=headers)
  req_body = {
    'data':{
      'access_token':access_token,
      'playlist_id':playlist_id,
      'item_id':item_id
    }
  }
  response = client.post('spotify/add_item_to_playlist',json=req_body)

  assert requests_mock.called == True
  assert requests_mock.call_count ==1
  spotify_add_item_endpoint =requests_mock.request_history[0]
  body = {'uris': [item_id]}
  byte_str = spotify_add_item_endpoint.body
  dict_str = byte_str.decode("UTF-8")
  mydata = ast.literal_eval(dict_str)
  assert  mydata == body
  assert response.status_code == 200
  assert response.json['code'] ==CONFIGS.endpointMsgCodes['success']


def test_get_users_playlists_info_spotify(client,monkeypatch):
  access_token = 'A'
  req_body = {
    'data':{
      'access_token':access_token
    }
  }
  def fake_get_user_info(a):
    return {
      'id':1
    }
  monkeypatch.setattr('spotify.get_user_info', fake_get_user_info)
  def fake_get_users_playlists_spotify(a,b):
    return {'items':'Some Items'}
  monkeypatch.setattr('spotify.get_users_playlists_spotify', fake_get_users_playlists_spotify)
  response = client.post('spotify/get_users_playlists',json=req_body)

  assert response.json == {
    'data':{'playlists':'Some Items'},
    'code': CONFIGS.endpointMsgCodes["success"]
  }
  assert response.status_code == 200

def test_get_user_info(client,requests_mock):

  url = "https://api.spotify.com/v1/me"
  headers = {"Authorization": "Bearer {}".format(access_token)}
  requests_mock.get(url,headers=headers,json={})
  get_user_info(access_token)
  assert requests_mock.called == True
  assert requests_mock.call_count ==1


def test_get_users_playlists_spotify(requests_mock):
  # arrange
  query_string = urlencode({
    'limit':50
  })
  url = "https://api.spotify.com/v1/users/{}/playlists?{}".format(user_id,query_string)
  headers = {"Authorization": "Bearer {}".format(access_token)}
  requests_mock.get(url,headers=headers,json={})

  # act
  get_users_playlists_spotify(access_token,user_id)

  # assert
  assert requests_mock.called == True
  assert requests_mock.call_count ==1
