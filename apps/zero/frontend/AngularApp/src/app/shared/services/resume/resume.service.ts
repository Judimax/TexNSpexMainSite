import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { readFileContent } from '@core/utility/common-utils';
import { UtilityService } from '@core/utility/utility.service';
import { ENV } from '@env/environment';
import { WMLFileUploadItem } from '@windmillcode/wml-file-manager';
import { concatMap, iif, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    public http:HttpClient,
    public utilityService:UtilityService
  ) { }


  

  submitFormToAnalyzeResume = (uiBody:SubmitFormToAnalyzeResumeUIRequestBody,raw = false)=>{

    return iif(
      ()=>ENV.resumeService.submitFormToAnalyzeResume.automate,
      of(new SubmitFormToAnalyzeResumeUIResponseBody()),

      submitFormToAnalyzeResumeLoad(uiBody)
      .pipe(
        concatMap((apiBody)=>{
          return this.http
          .post(ENV.resumeService.submitFormToAnalyzeResume.url(),apiBody)
          .pipe(raw ? tap() : map(submitFormToAnalyzeResumeSuccess))
        })
      )
    )
  }

}

let submitFormToAnalyzeResumeLoad  = (uiBody:SubmitFormToAnalyzeResumeUIRequestBody): Observable<SubmitFormToAnalyzeResumeAPIRequestBody>=>{

  let apiBody = new SubmitFormToAnalyzeResumeAPIRequestBody({})
  // @ts-ignore
  apiBody.data = {
    jobDesc : uiBody.jobDesc
  }

  return readFileContent(uiBody.resume[0].file,"readAsBinaryString")
  .pipe(
    take(1),
    map((res)=>{
      console.log(res)
      apiBody.data.resume=res.content
      return apiBody
    })
  )
}

let submitFormToAnalyzeResumeSuccess = (apiBody:SubmitFormToAnalyzeResumeAPIResponseBody):SubmitFormToAnalyzeResumeUIResponseBody=>{
  let uiBody = apiBody
  return uiBody
}


export class SubmitFormToAnalyzeResumeUIRequestBody {
  constructor(params:Partial<SubmitFormToAnalyzeResumeUIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  jobDesc: string
  resume: Array<WMLFileUploadItem>
}

export class SubmitFormToAnalyzeResumeUIResponseBody {
  constructor(params:Partial<SubmitFormToAnalyzeResumeUIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}


export class SubmitFormToAnalyzeResumeAPIRequestBody {
  constructor(params:Partial<SubmitFormToAnalyzeResumeAPIRequestBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  data: {
    jobDesc: string
    resume: string
  }
}

export class SubmitFormToAnalyzeResumeAPIResponseBody {
  constructor(params:Partial<SubmitFormToAnalyzeResumeAPIResponseBody>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}
