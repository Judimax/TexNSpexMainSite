import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from '@core/utility/utility.service';
import { ENV } from '@env/environment';
import { iif, of, concatMap, tap, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(
    public http:HttpClient,
    public utilityService:UtilityService
  ) { }

  joinWaitList = (uiBody:JoinWaitListUIRequestBody,raw = false)=>{

    return iif(
    ()=>ENV.intakeService.joinWaitList.automate,
      of(new JoinWaitListUIResponseBody()),

      joinWaitListLoad(uiBody)
        .pipe(
          concatMap((apiBody)=>{
            return this.http
            .post(ENV.intakeService.joinWaitList.url(),apiBody)
            .pipe(raw ? tap() : map(joinWaitListSuccess))
        })
      )
    )
  }

}




let joinWaitListLoad = (uiBody:JoinWaitListUIRequestBody): Observable<JoinWaitListAPIRequestBody>=>{

  let apiBody = new JoinWaitListAPIRequestBody({
    data:uiBody
  })
  return of(apiBody)
  .pipe(
    take(1),
  )
}

let joinWaitListSuccess = (apiBody:JoinWaitListAPIResponseBody):JoinWaitListUIResponseBody=>{
  let uiBody = new JoinWaitListUIResponseBody({
    waitlistId:apiBody.data.waitlist_id
  })
  return uiBody
}

export class JoinWaitListUIRequestBody {
  constructor(params:Partial<JoinWaitListUIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  name:string
  email:string
  phone:string
}

export class JoinWaitListUIResponseBody {
  constructor(params:Partial<JoinWaitListUIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  waitlistId:string
}

export class JoinWaitListAPIRequestBody {
  constructor(params:Partial<JoinWaitListAPIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  data:JoinWaitListUIRequestBody
}

export class JoinWaitListAPIResponseBody {
  constructor(params:Partial<JoinWaitListAPIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  data:{
    waitlist_id:string
  }
}
