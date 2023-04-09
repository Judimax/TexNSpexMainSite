import json
from configs import CONFIGS
import msal
from my_util import print_if_dev
from flask import Blueprint,request,redirect,session,url_for
from urllib.parse import urlencode,urlparse, parse_qs
from requests.auth import HTTPBasicAuth
import requests


myauth =Blueprint("auth", __name__, url_prefix="/auth")


def _validate_delegate_access_token(delegate_access_token):
  url = "https://{}.onmicrosoft.com/{}".format(
    CONFIGS.azure_auth["b2c_tenant"],
    CONFIGS.azure_auth["client_id"]
  )
  resp = requests.get(
        url,
        headers={'Authorization': 'Bearer {}'.format(delegate_access_token)},
        ).json()
  print(resp)
  print(resp.content)

def _get_azure_delegate_access_token(authorization_code):
  url = "https://login.microsoftonline.com/{}/oauth2/v2.0/token HTTP/1.1".format(
    CONFIGS.azure_auth["ad_tenant_id"]
  )

  req_body = urlencode({
    "client_id":CONFIGS.azure_auth["client_id"],
    "scope":"user.readwrite",
    "code":authorization_code,
    "redirect_uri":"{}/auth/login_callback".format(CONFIGS.app["domain_name"]),
    "grant_type":"authorization_code",
    "client_secret":CONFIGS.azure_auth["client_secret"],
  })
  headers={
    "Content-Type":"application/x-www-form-urlencoded"
  }
  resp = requests.post(url, data=req_body,headers=headers)
  resp_body= resp.json()
  print_if_dev(resp_body)
  return resp_body["access_token"]

@myauth.route("/update_profile",methods=["PATCH"])
def update_user_profile():

  data = request.json["data"]
  _validate_delegate_access_token(data["access_token"])

  #
  url = "https://graph.microsoft.com/v1.0/users/{}".format(data["user_id"])
  req_body = json.dumps({
    "givenName":data["first_name"],
    "surname":data["last_name"]
  })
  headers = {
    "Authorization": "Bearer {}".format(data["access_token"]),
    "Content-Type":"application/json"
  }
  resp = requests.patch(url, req_body,headers=headers)
  print_if_dev(resp.content)
  return {
    "msg":"A-OK",
    "code": CONFIGS.endpointMsgCodes["success"]
  },204

@myauth.route('/login_callback',methods=['GET'])
def take_actions_after_user_authorization_request():

  cca  = _build_msal_app()
  result = cca.acquire_token_by_authorization_code(request.args["code"],CONFIGS.azure_auth["scope"])

  delegated_access_token = _get_azure_delegate_access_token(request.args["code"])

  userinfo = result.get("id_token_claims")
  query_string = urlencode({
    'user_id': userinfo["sub"],
    'user_name':userinfo["name"],
    'first_name':userinfo['given_name'],
    'last_name':userinfo['family_name'],
    'country':userinfo['country'],
    'access_token':delegated_access_token
  })

  redirect_resp = redirect("{}/profile?{}".format(CONFIGS.app['frontend_angular_app_url'],query_string),code=302)
  redirect_resp.set_cookie(
    'azure_refresh_token',
    result.get("refresh_token"),
    domain=CONFIGS.app['frontend_angular_app_domain'],
    httponly=True,
    samesite="Lax",
    secure=True
  )
  return redirect_resp





def _build_msal_app(cache=None, authority=None):

    return msal.ConfidentialClientApplication(
        CONFIGS.azure_auth["client_id"], authority=authority or CONFIGS.azure_auth["signupsignin_authority"],
        client_credential=CONFIGS.azure_auth["client_secret"], token_cache=cache)



