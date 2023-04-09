import secrets
import string
import os
from time import sleep
from urllib.parse import parse_qs, urlencode, urlparse
from configs import CONFIGS


def local_deps():
    import sys
    if sys.platform == "win32":
        sys.path.append(sys.path[0] + "\\site-packages\\windows")
    elif sys.platform =="linux":
        sys.path.append(sys.path[0] + "/site-packages/linux")
    elif sys.platform =="darwin":
        sys.path.append(sys.path[0] + "/site-packages/linux")
local_deps()
from sqlalchemy import create_engine
import requests
from flask.json import jsonify
import json



sqlalchemy_0_engine = ""
sqlalchemy_0_conn = ""
def set_up_sql_conn():
    global sqlalchemy_0_engine
    sqlalchemy_0_engine = create_engine(CONFIGS.postgres["conn_string"],pool_pre_ping=True)
    global sqlalchemy_0_conn
    sqlalchemy_0_conn = sqlalchemy_0_engine.connect()
# set_up_sql_conn()


from werkzeug.http import parse_cookie

import pprint
pp = pprint.PrettyPrinter(indent=2, compact=False, width=1)
import sendgrid





# DEV ADDITIONS
class APIMsgFormat():
  def __init__ (self,data,access_token="",msg="OK"):
    self.data = data
    self.access_token = access_token
    self.msg = msg

  data ={
    "please ":"provide data in the data property"
  }
  access_token =""
  msg = "OK"
  code = ""

  def return_flask_response(self):
    return jsonify(self.__dict__)

class APIError(Exception):
    """All custom API Exceptions"""
    pass

class APIAuthError(APIError):
  code = 403
  description = "Authentication Error"

class APIServerError(APIError):
  code = 500
  description = "The server is having an issue processing the request please contact developer support"




def print_if_dev(item,pretty=False):
    if os.getenv("FLASK_BACKEND_ENV") == "DEV":
        if pretty == True:
          pp.pprint(item)
        else:
          print(item)

def generate_random_string(len =7):
    return ''.join(secrets.choice(string.ascii_uppercase + string.ascii_lowercase) for i in range(len))

def turn_query_params_to_object(url):
    parsed_url = urlparse(url)
    return {
        x:y[0] for x,y in parse_qs(parsed_url.query).items()
    }

def turn_cookie_to_object(cookie_list,cookie_name):
    cookie = next(
        (cookie for cookie in cookie_list if cookie_name in cookie),
        None
    )
    return parse_cookie(cookie) if cookie is not None else cookie


def generate_twillio_sendgrid_email_req_body(from_email,to_emails=[],personalizations_subject="Sample Subject",email_template="Sample Email"):
  return {
    "personalizations":[{
      "to":[{"email":email} for email in to_emails],
      "subject":personalizations_subject
    }],
    "from":{"email":from_email},
    "content":[
      {
        "type": "text/html",
        "value": email_template
      }
    ]
  }


