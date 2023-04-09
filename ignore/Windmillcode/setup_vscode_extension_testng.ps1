# $PSDefaultParameterValues = @{ '*:Encoding' = 'utf8' }

$envvars = @"
CHROMEDRIVER=C:\\Users\\[YOUR USERNAME HERE]\\Testing\\webdrivers\\chromedriver-v110.0.5481.77-win32\\chromedriver.exe
FIREFOXDRIVER=C:\\Users\\[YOUR USERNAME HERE]\\Testing\\webdrivers\\geckodriver-v0.32.2-win32\\geckodriver.exe
OPERADRIVER=C:\\Users\\[YOUR USERNAME HERE]\\Testing\\webdrivers\\operadriver-v109.0.5414.120_win64\\operadriver.exe
EDGEDRIVER=C:\\Users\\[YOUR USERNAME HERE]\\Testing\\webdrivers\\edgedriver-v110.0.1587.41_win64\\msedgedriver.exe
FIREBASE_AUTH_EMULATOR_HOST=http://127.0.0.1:9098/auth
"@

$path = $MyInvocation.MyCommand.Path
if (!$path) {$path = $psISE.CurrentFile.Fullpath}
if ($path)  {$path = Split-Path $path -Parent}

$E2EDir = $path + "\..\..\apps\zero\testing\testng"
Set-Location $E2EDir

Set-Content -Path .env -Value $envvars
