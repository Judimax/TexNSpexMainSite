// angular
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

// i18n
import {  TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { deepCopy } from './common-utils';



@Injectable({
  providedIn: 'root',

})
export class UtilityService {

  constructor(
    public translateService: TranslateService,
    public router:Router

  ) { }

  isIframe = window !== window.parent && !window.opener;
  deepCopy=deepCopy
  getQueryParamByName=(name, url = window.location.href)=> {
    let urlSearchParams:any = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlSearchParams.entries());
    return params[name]
  }

  generateRandomNumber = (range: number = 100, additional: number = 0) => {
    return Math.floor(Math.random() * range) + additional
  }

  generateRandomColor = () => {
    return `#${this.generateRandomNumber(0xFFFFFF).toString(16)}`
  }

  selectRandomOptionFromArray = (myArray: Array<any>, index?: number) => {
    return myArray[this.generateRandomNumber(index ?? myArray.length)]
  }

  changeLanguage(langCode:string){
    this.translateService.use(langCode)
  }

  scrollBottomPaginationParamsUpdateBody = (()=>{
    let counter = 1
    return ()=>{
      return {
        "data":{
          "page":counter++
        }
      }
    }
  })()

  eventDispatcher(event: string, element: HTMLElement | Window | Element,keyboardCharCode:number =13) {

    try {
      let eventModern
      if(["keydown","keyup"].includes(event) ){
        let eventInitObj = {
          13:{
            code: 'Enter',
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true
          }
        }[keyboardCharCode]
        eventModern = new KeyboardEvent(event,eventInitObj)
      }
      else{

        eventModern = new Event(event)
      }

      element.dispatchEvent(eventModern)
    }
    catch (e) {
      let eventLegacy = document.createEvent("Event");
      eventLegacy.initEvent(event, false, true);
      element.dispatchEvent(eventLegacy)
    }
  }

  numberParse(dimension: any /* string or array */): number {

    if (typeof dimension === "string") {
      return parseFloat(dimension.split("p")[0])
    }
    else {
      return dimension
        .map((x: string) => {
          return parseFloat(x.split("p")[0])
        })
    }
  }
  generateClassPrefix(prefix:string) {
    return (val: string) => {
      return prefix + val
    }
  }

  clearArray(A: Array<any>) {
    A.splice(0,A.length)
  }


  readFileContent(file: File): Observable<string> {
    let reader = new FileReader();
    reader.readAsBinaryString(file)
    return fromEvent(reader as any,"onload")
    .pipe(
      map(()=>{
        return reader.result.toString()
      })
    )

  }

  makeLowerCase = new LowerCasePipe().transform
  makeTitleCase = new TitleCasePipe().transform

}



