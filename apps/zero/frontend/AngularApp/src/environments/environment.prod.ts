import { DevEnv, traverseClassAndRemoveAutomationForProduction } from "./environment.dev"


export let environment = {
  production: true
}
class ProdEnv extends DevEnv  {


  constructor(){
    super()
    this.type = "prod"
    this.backendDomain0 = "https://api.findmyrole.co"
    traverseClassAndRemoveAutomationForProduction(this)
  }
}


export let ENV =   new ProdEnv()
