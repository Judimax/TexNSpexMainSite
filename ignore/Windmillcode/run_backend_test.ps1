Param
(
    [Parameter(Mandatory = $true)] [string] $scriptUser
)


Set-Location Env:

# dev
Set-Content -Path FLASK_BACKEND_ENV                       -Value "TEST"

Set-Content -Path NEWSAPI_KEY                             -Value ""
Set-Content -Path SPOTIFY_APP_0_CLIENT_ID                 -Value ""
Set-Content -Path SPOTIFY_APP_0_CLIENT_SECRET             -Value ""
Set-Content -Path MORALIS_WEB3_API_KEY                    -Value ""
Set-Content -Path EVENTBRITE_PRIVATE_OAUTH_TOKEN          -Value ""
Set-Content -Path WINDMILLCODE_TWILLIO_SENGRID_APIKEY_0          -Value ""
Set-Content -Path WINDMILLCODE_WEBAPP_ACCTMGNT_CLIENT_SECRET_0   -Value ""
Set-Content -Path AZURE_AUTH_0_CLIENT_SECRET              -Value ""


$ProjectDir =  $HOME +  "\project_template\apps\zero\backend\FlaskApp\unit_tests"
$RunScriptDir = $HOME + "\project_template\ignore\"+$scriptUser
Set-Location $ProjectDir
python run_tests.py


