import { HttpParams } from '@angular/common/http';
import { WMLEndpoint } from '@windmillcode/wml-components-base';

export let environment = {
  production: false
}
export let traverseClassAndRemoveAutomationForProduction = (obj,stack=[])=>{
  Object.entries(obj).forEach(entry=>{
    let [key,value] = entry
    if(value instanceof Object){
      stack.push(obj[key])
      traverseClassAndRemoveAutomationForProduction(value,stack)
      stack = []
    }
    else{
      if(key ==="automate"){
        stack[stack.length-1].automate = false
      }
    }
  })
}

export class DevEnv {

  type:"dev" | "preview" | "prod" = "dev"
  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }

  errorCodes = {
  }

  app={
    backendHealthCheck:() =>this.backendDomain0 + "/healthz/"
  }


  // backendDomain0 ="https://example.com:5000"
  backendDomain0 =" https://127.0.0.1:5000"
  frontendDomain0 ="https://example.com:4200"
  classPrefix= {
    app:"App"
  }

  nav = {
    urls:{
      home:"/",
      homeAlt:"/home",
      sample:"/sample",
      profile:"/profile",
      profileTypeQuestionaire:"/profile-type-questionaire",
      initialURL:"",
    },
    spotifyLoginEndpoint:() => this.backendDomain0 + "/spotify/login"
  }

  profileOneMain = {
    mainForm:{
      jobDescFormControlName:"jobDesc",
      resumeFormControlName:"resume"
    }
  }

  questionaireOneMain = {
    mainForm:{
      waitListIdFormControlName:"waitListId",
      cognitoUserIdFormControlName:"cognitoUserId"
    }
  }

  joinWaitlistForm = {
    mainForm:{
      nameFormControlName:"name",
      emailFormControlName:"email",
      phoneFormControlName:"phone",
    }
  }

  resumeService = {
    submitFormToAnalyzeResume:new WMLEndpoint({
      url:()=> this.backendDomain0 + "/resume/analyze"
    })
  }

  userService = {
    getProfileTypeQuestions:new WMLEndpoint({
      url:()=> this.backendDomain0 + "/user_profile/get_type_questions"
    }),
    saveProfileTypeAnswers:new WMLEndpoint({
      url:()=> this.backendDomain0 + "/user_profile/save_type_answers"
    })
  }

  intakeService = {
    joinWaitList:new WMLEndpoint({
      url:()=> this.backendDomain0 + "/intake/join_waitlist"
    })
  }

  constructor(){
    // traverseClassAndRemoveAutomationForProduction(this)
  }
}

export let ENV =   new DevEnv()


