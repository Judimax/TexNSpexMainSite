Param
(
    [Parameter(Mandatory = $true)] [string] $scriptUser
)

Set-Location Env:

# dev
Set-Content -Path FLASK_BACKEND_ENV                          -Value "DEV"
Set-Content -Path NEWSAPI_KEY                                -Value ""
Set-Content -Path SPOTIFY_APP_0_CLIENT_ID                    -Value ""
Set-Content -Path SPOTIFY_APP_0_CLIENT_SECRET                -Value ""
Set-Content -Path MORALIS_WEB3_API_KEY                       -Value ""
Set-Content -Path EVENTBRITE_PRIVATE_OAUTH_TOKEN             -Value ""
Set-Content -Path WINDMILLCODE_TWILLIO_SENGRID_APIKEY_0             -Value ""
Set-Content -Path WINDMILLCODE_WEBAPP_ACCTMGNT_CLIENT_SECRET_0      -Value ""
Set-Content -Path AZURE_AUTH_0_CLIENT_SECRET                 -Value ""
Set-Content -Path AZURE_AUTH_1_CLIENT_SECRET                 -Value ""
Set-Content -Path SQLALCHEMY_PYMSSQL_0_CONN_STRING           -Value "mssql+pyodbc://yourpasswordhere@localhost/windillcode-mssql-database-0?driver=ODBC+Driver+17+for+SQL+Server"

Set-Content -Path RESTDBIO_SERVER_API_KEY_0                  -Value ""

$ProjectDir =  $HOME +  "\My_Apps\project_template\apps\zero\backend\FlaskApp"
$RunScriptDir = $HOME + "\My_Apps\project_template\ignore\"+$scriptUser
Set-Location $ProjectDir
python app.py
# waitress-serve --listen=*:5000 --threads=100  app:app

Set-Location $RunScriptDir
./run_backend_dev.ps1 $scriptUser
