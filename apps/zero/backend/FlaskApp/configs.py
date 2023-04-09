import os

class DevConfigs:

  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }
  windmillcode_service_acct = [
    {
      'email':"Developer@WINDMILLCODEInc771.onmicrosoft.com"
    }
  ]
  NEWSAPI_APIKEY =os.getenv("NEWSAPI_KEY")
  NEWSAPI_ENDPOINT ="https://newsapi.org/v2/top-headlines"
  app= {
    'access_control_allow_origin':['https://example.com:4200','https://example.com:4201'],
    'server_name':'example.com:5000',
    'domain_name':'https://example.com:5000',
    'flask_env':'development',
    'frontend_angular_app_url':'https://example.com:4200',
    'frontend_angular_app_domain':'example.com'
  }



  mssql = {

    "conn_string":os.getenv("SQLALCHEMY_PYMSSQL_0_CONN_STRING")
  }

  postgres ={
    "conn_string":os.getenv("SQLALCHEMY_POSTGRESSQL_0_CONN_STRING")
  }

  def __init__(self):
    None


class TestConfigs(DevConfigs):
  None

class PreviewConfigs(DevConfigs):

  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'development'


class ProdConfigs(DevConfigs):

  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'production'
    self.app['server_name']= "169.254.129.3"

CONFIGS= {
  'PROD':lambda x:ProdConfigs(),
  'PREVIEW':lambda x:PreviewConfigs(),
  'DEV':lambda x:DevConfigs(),
  'TEST':lambda x:TestConfigs(),
}[os.getenv("FLASK_BACKEND_ENV")](None)







