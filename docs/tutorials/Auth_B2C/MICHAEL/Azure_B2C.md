* always try to use delegated_access_token, because in the audit logs it will show as application instead of you

[Azure Auth w/o user flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/sample-v2-code)


[MSAL.py documentation](https://msal-python.readthedocs.io/en/latest/)


# Get access token
  * try this docks
  [Get Access w/o a user](https://learn.microsoft.com/en-us/graph/auth-v2-service)
  [OpenIDC](https://learn.microsoft.com/en-us/azure/active-directory-b2c/openid-connect)


[Get Refresh token Azure Auth b2c](https://medium.com/the-new-control-plane/getting-an-access-token-in-azure-ad-b2c-620c0790b964)
* so in the scope you need to provide the client id of the app
```py
def _get_azure_access_token(auth_code):
  url = "https://{tenant_name}.b2clogin.com/{tenant_name}.onmicrosoft.com/{user_flow}/oauth2/v2.0/token".format(
    tenant_name =CONFIGS.azure_auth["b2c_tenant"],
    user_flow= CONFIGS.azure_auth["signupsignin_user_flow"]
  )
  req_body = urlencode({
    "grant_type":"authorization_code",
    "client_id":CONFIGS.azure_auth["client_id"],
    "scope":"offline_access openid {}".format(CONFIGS.azure_auth["client_id"]),
    "code":auth_code,
    "redirect_uri":CONFIGS.app["domain_name"],
    "client_secret":CONFIGS.azure_auth["client_secret"]
  })
  headers={
    "Content-Type":"application/x-www-form-urlencoded"
  }
  resp = requests.post(url, data=req_body,headers=headers)
  resp_body =resp.json()
  return resp_body["access_token"]
```

[Account creation with Azure B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/quickstart-single-page-app)
* must create a tenant an azure Active directory
* check to make sure the B2C app has  Grant admin consent to openid and offline_access
* A user flow lets you determine how users interact with your application when they do things like sign-in, sign-up, edit a profile, or reset a password.
* [Cannot find user flow](https://stackoverflow.com/a/65525748)
  * use the dirrectory picker and switch from the employee directory to the customer directory

* [Customize Session Behaviour](https://learn.microsoft.com/en-us/azure/active-directory-b2c/session-behavior?pivots=b2c-custom-policy#configure-the-custom-policy)



[API integration B2C](https://github.com/Azure-Samples/ms-identity-python-webapp/blob/master/README_B2C.md)
* client ID  - nibls-webapp-acctmgnt-1
* client secret - nibls-webapp-acctmgnt-1-clientsecret-0

* with ccca.acquire_token_by_refresh_token
```py

def _get_azure_access_token(cca,refresh_token):
  scopes =[CONFIGS.azure_auth["client_id"]]
  result = cca.acquire_token_by_refresh_token(refresh_token,scopes)
  print_if_dev(result,True)
  return result["access_token"]
```

```py
def _get_azure_access_token(auth_code):
  url ="https://login.microsoftonline.com/{active_directory_id}/oauth2/v2.0/authorize?".format(
    active_directory_id ="6ec537e6-c82d-4caa-91a9-e7ba59ebf85a"
    )
  query_params = urlencode({

    "client_id":CONFIGS.azure_auth["client_id"],
    "response_type":"code",
    "redirect_uri":"{}/auth/access_token_callback".format(CONFIGS.app["domain_name"]),
    "response_mode":"query",
    "scope":"offline_access user.read User.ReadWrite.All",
    "grant_type":"authorization_code",
  })

  redirect_resp = redirect(url+query_params,code=302)
  return redirect_resp



def _get_azure_customer_access_token(middle_tier_access_token):


  url ="https://login.microsoftonline.com/{}/oauth2/v2.0/token".format(CONFIGS.azure_auth["ad_tenant_id"])
  req_body = urlencode({
    "grant_type":"urn:ietf:params:oauth:grant-type:jwt-bearer",
    "client_id":CONFIGS.azure_auth["client_id"],
    "client_secret":CONFIGS.azure_auth["client_secret"],
    "assertion":middle_tier_access_token,
    "scope":"https://graph.microsoft.com/.default",
    "requested_token_use":"on_behalf_of"
  })
  headers={
    "Content-Type":"application/x-www-form-urlencoded"
  }
  resp = requests.post(url, data=req_body,headers=headers)
  resp_body = resp.json()
  print_if_dev(resp_body)
  return resp_body["access_token"]


def _get_azure_access_token(auth_code):


  url = "https://{tenant_name}.b2clogin.com/{tenant_name}.onmicrosoft.com/{user_flow}/oauth2/v2.0/token".format(
    tenant_name =CONFIGS.azure_auth["b2c_tenant"],
    user_flow= CONFIGS.azure_auth["signupsignin_user_flow"]
  )
  # CONFIGS.azure_auth["client_id"]
  req_body = urlencode({
    "grant_type":"authorization_code",
    "client_id":CONFIGS.azure_auth["client_id"],
    "scope":"offline_access openid {}".format(CONFIGS.azure_auth["client_id"]),
    "code":auth_code,
    "redirect_uri":CONFIGS.app["domain_name"],
    "client_secret":CONFIGS.azure_auth["client_secret"]
  })
  headers={
    "Content-Type":"application/x-www-form-urlencoded"
  }
  resp = requests.post(url, data=req_body,headers=headers)
  resp_body =resp.json()
  print_if_dev(resp_body,True)

  return resp_body["access_token"]



@myauth.route("/access_token_callback",methods=['GET'])
def take_actions_after_access_token_request():
  print_if_dev(request.args,True)
  result = _build_msal_app().acquire_token_by_authorization_code(request.args["code"],CONFIGS.azure_auth["scope"])
  print_if_dev(result,True)
  userinfo = result.get("id_token_claims")
  query_string = urlencode({
    'user_id': userinfo["sub"],
    'user_name':userinfo["name"],
    'first_name':userinfo['given_name'],
    'last_name':userinfo['family_name'],
    'country':userinfo['country'],
    'access_token':request.args["code"]
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
```
