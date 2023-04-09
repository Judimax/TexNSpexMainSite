import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '@core/utility/utility.service';
import { ENV } from '@env/environment';
import { concatMap, iif, map, Observable, of, take, tap } from 'rxjs';
import { transformFromCamelCaseToSnakeCase } from '@core/utility/common-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http:HttpClient,
    public utilityService:UtilityService,
  ) { }

  getProfileTypeQuestions = (raw = false)=>{

    return iif(
    ()=>ENV.userService.getProfileTypeQuestions.automate,
      of(new GetProfileTypeQuestionsUIResponseBody()),

      getProfileTypeQuestionsLoad()
        .pipe(
          concatMap((apiBody)=>{
            return this.http
            .get(ENV.userService.getProfileTypeQuestions.url(),apiBody)
            .pipe(raw ? tap() : map(getProfileTypeQuestionsSuccess))
        })
      )
    )
  }

  saveProfileTypeAnswers = (uiBody:SaveProfileTypeAnswersUIRequestBody,raw = false)=>{

    return iif(
    ()=>ENV.userService.saveProfileTypeAnswers.automate,
      of(new SaveProfileTypeAnswersUIResponseBody()),

      saveProfileTypeAnswersLoad(uiBody)
        .pipe(
          concatMap((apiBody)=>{
            return this.http
            .put(ENV.userService.saveProfileTypeAnswers.url(),apiBody)
            .pipe(raw ? tap() : map(saveProfileTypeAnswersSuccess))
        })
      )
    )
  }




}




let getProfileTypeQuestionsLoad = (): Observable<GetProfileTypeQuestionsAPIRequestBody>=>{

  let apiBody = new GetProfileTypeQuestionsAPIRequestBody({})
  return of(apiBody)
  .pipe(
    take(1),
  )
}

let getProfileTypeQuestionsSuccess = (apiBody:GetProfileTypeQuestionsAPIResponseBody):GetProfileTypeQuestionsUIResponseBody=>{

  let {data} = apiBody

  let questions = data.questions.map((entry)=>{

    let options = entry.custom_answer_options?? []
    if(options.length ===0){
      options = data.default_answer_options
    }

    return {
      label:entry.text,
      id:entry.id,
      options
    }
  })
  let uiBody = new GetProfileTypeQuestionsUIResponseBody({questions})

  return uiBody
}

export class GetProfileTypeQuestionsUIRequestBody {
  constructor(params:Partial<GetProfileTypeQuestionsUIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}

export class GetProfileTypeQuestionsUIResponseBody {
  constructor(params:Partial<GetProfileTypeQuestionsUIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  questions: {
    label: string;
    id: string;
    options: {
        id: string;
        text: string;
    }[];
}[]
}

export class GetProfileTypeQuestionsAPIRequestBody {
  constructor(params:Partial<GetProfileTypeQuestionsAPIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}

export class GetProfileTypeQuestionsAPIResponseBody {
  constructor(params:Partial<GetProfileTypeQuestionsAPIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  code: string;
  data: {
    default_answer_options: {
      id: string;
      text: string;
    }[];
    questions: {
      custom_answer_options?: GetProfileTypeQuestionsAPIResponseBody["data"]["default_answer_options"];
      text: string;
      id:string;
    }[];
  };
}


let saveProfileTypeAnswersLoad = (uiBody:SaveProfileTypeAnswersUIRequestBody): Observable<SaveProfileTypeAnswersAPIRequestBody>=>{

  let data =new SaveProfileTypeAnswersUIRequestBody(uiBody)
  data[transformFromCamelCaseToSnakeCase("cognitoUserId")] = data.cognitoUserId
  data[transformFromCamelCaseToSnakeCase("waitListId")] = data.waitListId
  delete data.cognitoUserId
  delete data.waitListId
  let apiBody = new SaveProfileTypeAnswersAPIRequestBody({data})
  return of(apiBody)
  .pipe(
    take(1),
  )
}

let saveProfileTypeAnswersSuccess = (apiBody:SaveProfileTypeAnswersAPIResponseBody):SaveProfileTypeAnswersUIResponseBody=>{
  let uiBody = new SaveProfileTypeAnswersUIResponseBody({})
  return uiBody
}

export class SaveProfileTypeAnswersUIRequestBody {
  constructor(params:Partial<SaveProfileTypeAnswersUIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  [k:string]:string[]
  // @ts-ignore
  cognito_user_id?:string;
  // @ts-ignore
  wait_list_id?:string;
}

export class SaveProfileTypeAnswersUIResponseBody {
  constructor(params:Partial<SaveProfileTypeAnswersUIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}

export class SaveProfileTypeAnswersAPIRequestBody {
  constructor(params:Partial<SaveProfileTypeAnswersAPIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  data:SaveProfileTypeAnswersUIRequestBody
}

export class SaveProfileTypeAnswersAPIResponseBody {
  constructor(params:Partial<SaveProfileTypeAnswersAPIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}
