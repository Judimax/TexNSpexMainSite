from configs import CONFIGS
from flask import Blueprint,request
from my_util import print_if_dev,sqlalchemy_0_conn
from sqlalchemy import text

myintake =Blueprint("intake", __name__, url_prefix="/intake")



@myintake.route('/join_waitlist',methods=['POST'])
def join_waitlist():
  data = request.json['data']
  result_proxy  = sqlalchemy_0_conn.execute(text("""
    INSERT INTO  Wait_list (fullname,email,phone)
    VALUES ('{}','{}','{}')
    RETURNING id;
    """.format(data["name"],data["email"],data["phone"])))
  sqlalchemy_0_conn.commit()
  result = result_proxy.fetchone()
  row_dict = dict(result._mapping)

  return {
    "data":{
      "waitlist_id":row_dict["id"]
    },
    "code": CONFIGS.endpointMsgCodes["success"]
  },200


