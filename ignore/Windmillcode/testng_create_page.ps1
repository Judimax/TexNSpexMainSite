Param
(
    [Parameter(Mandatory = $true)] [string] $PageName
)

# Set active path to script-location:
$path = $MyInvocation.MyCommand.Path
if (!$path) {$path = $psISE.CurrentFile.Fullpath}
if ($path)  {$path = Split-Path $path -Parent}
Set-Location $path

$ScriptDir = $PWD.path + "\..\apps\zero\testing\testng\src\main\java\pages"
Set-Location $ScriptDir

$MyDir = $PageName.ToLower()
mkdir $PageName.ToLower()
$myPrefix = (Get-Culture).TextInfo.ToTitleCase($MyDir)

$myAct = ".\"+$MyDir+"\"+$myPrefix+"ActController.java"
$myPage = ".\"+$MyDir+"\"+$myPrefix+"Page.java"
$myVerify = ".\"+$MyDir+"\"+$myPrefix+"VerifyController.java"


cp   ".\template\TemplateActController.java"    $myAct;
cp   ".\template\TemplatePage.java"             $myPage;
cp   ".\template\TemplateVerifyController.java" $myVerify;
