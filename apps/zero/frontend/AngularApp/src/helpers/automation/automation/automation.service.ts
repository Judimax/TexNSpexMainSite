
// angular
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import {ENV, environment} from '@env/environment'

// services
import { UtilityService } from '@core/utility/utility.service';

// misc


// rxjs
import { concatMap, forkJoin, from, of, tap, timer } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class  AutomateService {

  constructor(
    private utilService:UtilityService,
  ) {

    this.traverseClassAndNoopAllAutomationInit()

  }



  documentQuerySelector(selector:string){
    return document.querySelector(selector) as HTMLElement
  }

  documentQuerySelectorAll(selector:string){
    return Array.from(document.querySelectorAll(selector)) as Array<HTMLElement>
  }

  defaultNav ={
    openShareTray:()=>{

      of([])
      .pipe(

        tap(()=>{
          let shareBtn = this.documentQuerySelector("default-nav section.DefaultNavPod1 > button:nth-child(1)")
          shareBtn.click()
        })
      )
      .subscribe()

    }
  }




  generateFile(counter = 0){
    let obj = { hello: "world "+ counter };
    let blob =  new File([JSON.stringify(obj)], "foo.json", {
      type: "application/json",
    });
    return blob
  }

  traverseClassAndNoopAllAutomationInit(){
    let entries = Object.entries(this)
    .filter((entry)=>{
      let [key,val]= entry
      return val.constructor.name === "Object"
    })

    let result = Object.fromEntries(entries)

    this.traverseClassAndNoopAllAutomation(result)
  }

  traverseClassAndNoopAllAutomation(obj,stack=[]){
    if(!environment.production) {
      return
    }
    Object.entries(obj).forEach(entry=>{
      let [key,value] = entry
      if(value.constructor.name === "Object"){
        stack.push(obj[key])
        this.traverseClassAndNoopAllAutomation(value,stack)
        stack = []
      }
      else{
        if(value instanceof Function){
          stack[stack.length-1][key] = ()=>{}
        }
      }
    })
  }




}
