import { DevEnv, traverseClassAndRemoveAutomationForProduction } from "./environment.dev"


export let environment = {
  production: true
}
class ProdEnv extends DevEnv  {


  constructor(){
    super()
    this.type = "prod"
    traverseClassAndRemoveAutomationForProduction(this)
  }
}


export let ENV =   new ProdEnv()
