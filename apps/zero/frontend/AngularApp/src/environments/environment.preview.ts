import { DevEnv, traverseClassAndRemoveAutomationForProduction } from "./environment.dev"


export let environment = {
  production: true
}
class PreviewEnv extends DevEnv  {


  constructor(){
    super()
    this.type = "preview"
    this.backendDomain0 = "https://api.dev.findmyrole.co"
    traverseClassAndRemoveAutomationForProduction(this)
  }
}


export let ENV =   new PreviewEnv()
