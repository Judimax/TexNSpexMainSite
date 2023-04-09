import time
from my_util import print_if_dev
from configs import CONFIGS
import requests;
import math
from flask import Blueprint,request
import json
from urllib.parse import urlparse

myhealthcheck =Blueprint("healthcheck", __name__, url_prefix="/healthz")

@myhealthcheck.route('/',methods=['GET'])
def healthcheck():
  time.sleep(5)
  return {
    "msg":"A-OK",
    "code": CONFIGS.endpointMsgCodes["success"]
  },200



@myhealthcheck.route('/test',methods=['GET'])
def mytest_healthcheck():
  return {
    "msg":request.url,
    "code": CONFIGS.endpointMsgCodes["success"]
  },200
