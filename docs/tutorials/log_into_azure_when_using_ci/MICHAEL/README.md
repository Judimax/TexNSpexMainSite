* AZ 204
* https://learn.microsoft.com/en-us/certifications/exams/az-204

* AZ 900
* fundamentals



# Resources
* https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli#sign-in-with-a-service-principal
* https://learn.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#4-sign-in-using-a-service-principal
* [TroubleShooting](https://learn.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#7-troubleshooting)


## [Create an Azure Service principal](https://learn.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#4-sign-in-using-a-service-principal)


### Steps
```sh
az ad sp create-for-rbac --name nibls-service-principal-0 \
                         --role owner \
                          --scopes /subscriptions/[WRITE YOUR SUBSCRIPTION ID HERE]
```

* you get a password if you lose it [reset the credentials](https://learn.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#6-reset-credentials)
{
  "appId": "3bd76bdb-e6bd-4089-bba5-fbdee8e0b52c",
  "displayName": "nibls-service-principal-0",
  "password": "Etj8Q~.9n0-QLrkx6LNVkoLUHXrclywvfigITcs.",
  "tenant": "d4cb62e3-2f80-465c-932a-607c33cd2cd8"
}

* reset sp creds
```sh
az ad sp credential reset --name [myServicePrincipal_appID_or_name]
```
* to get serviec principals
```sh
az ad sp list --show-mine --query "[].{id:appId, tenant:appOwnerTenantId}"
```

* to manage sp roles

```sh
az role assignment create --assignee appID \
                          --role Reader \
                          --scope /subscriptions/mySubscriptionID/resourceGroups/myResourceGroupName

az role assignment delete --assignee appID \
                          --role Contributor \
                          --scope /subscriptions/mySubscriptionID/resourceGroups/myResourceGroupName
```

* sign in using a service principal
```sh
# password based
az login --service-principal --username appID --password PASSWORD --tenant tenantID

# cert based
az login --service-principal --username appID --tenant tenantID --password /path/to/cert
```