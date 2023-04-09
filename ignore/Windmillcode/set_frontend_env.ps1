Set-Location Env:


# prod
Set-Content -Path SWA_CLI_DEPLOYMENT_TOKEN  -Value ""

$ProjectDir = $HOME + "\project_template\apps\zero\frontend\AngularApp"
Set-Location $ProjectDir
