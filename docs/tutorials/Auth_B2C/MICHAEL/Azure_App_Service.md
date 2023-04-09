

[Authentication and authorization in Azure App Service and Azure Functions](https://www.youtube.com/watch?v=LyDgQx2asMU)
*  authentication is available is azure app service

* so now you have to provide an idp
* the account types Any Azure AD directory & personal Microsoft accounts
  means any account in your org as well as any microsoft accts
* Any Azure AD directory & personal Microsoft accounts

* 401 for unauthorized

* take the auth app id id and in
* active directory  ->  app registrations -> all applicatons
* paste the active directory id, you can modify it there

* add https://[app service name].scm.azurewebsites.net/ to access mgnt for your app
* no code to write authentication
* there should be libraries available you dont have to write any code




[Azure auth quickstart](https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-node/ms-identity-node/)

this is for the ms-idenity node folder,
rmbr to delete the app regristration once finished

[Azure auth quickstart python](https://learn.microsoft.com/en-us/azure/active-directory/develop/web-app-quickstart?pivots=devlang-python)

