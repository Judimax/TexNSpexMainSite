go to manage deployment token in static web apps in azure portal


* you want to run the deploy command from the directory root
  * --env flag deploy to production
```ts
npx swa deploy ./dist/azureSWA  --deployment-token [Your deployment token] --env production
```




## Backend Deployment
* your backend apps are known to azure as app services
* resource group associaties everything with one project

### Azure Container Service
* everything should be in lowercase

## Info 
* Azure Container Registry
  *niblsContainerRegistry0 

[Deploy customer container to azure app service by using azure container registery](https://docs.microsoft.com/en-us/azure/app-service/quickstart-custom-container?tabs=dotnet&pivots=container-linux-azure-portal#2---push-the-image-to-azure-container-registry)

[Flask app sample](https://github.com/Azure-App-Service/flask-docker/blob/master/Dockerfile)

[Enable ssh on your azure contianer](https://docs.microsoft.com/en-us/azure/app-service/configure-custom-container?pivots=container-linux#enable-ssh)


[Configure app service app env vars](https://docs.microsoft.com/en-us/azure/app-service/configure-custom-container?pivots=container-linux#configure-environment-variables)

[CD with Azure App Services](
https://docs.microsoft.com/en-us/azure/app-service/deploy-ci-cd-custom-container?tabs=acr&pivots=container-linux)

## Notes
* when you update settings the container recycles (restarts ) itself
* reply to the email for further follow up