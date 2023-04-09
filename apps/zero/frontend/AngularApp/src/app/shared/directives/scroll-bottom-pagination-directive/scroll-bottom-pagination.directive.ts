// angular
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Directive, Input } from '@angular/core';

// rxjs
import { filter, fromEvent, merge, Observable, Subject, takeUntil, tap } from 'rxjs';

// misc
import {BaseService} from "@core/base/base.service";

@Directive({
  selector: '[scrollBottomPagination]'
})
export class ScrollBottomPaginationDirective {

  constructor(
    private http:HttpClient,
    private baseService:BaseService
  ) { }
  @Input('scrollBottomPagination')
  params!:ScrollBottomPaginationParams
  ngUnsub = new Subject<void>()

  ngOnInit(){
    this.initLoadOnScrollBottom().subscribe()
    this.callAPIForMoreItems().subscribe()
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

  failedApiCalls = 0
  callAPIForMoreItems(){

    let {method,endpoint,updateBody} =this.params.apiInfo

    let apiRequest = new HttpRequest(
      method,
      endpoint,
      updateBody?.(),
    )
    this.baseService.toggleOverlayLoadingSubj.next(true);
    return (this.params.apiInfo.altHttpRequest ??this.http.request(apiRequest))
      .pipe(
        takeUntil(this.ngUnsub) ,
        (filter((res)=> {

          return res instanceof HttpResponse<any>
        }) as any),
        tap({
          next:(res:HttpResponse<any>)=>{
            this.params.populateItems(res.body)
          },
          error:(err:HttpErrorResponse)=>{
            this.params.notifyError(err,++this.failedApiCalls)
          }
        }),
        this.baseService.closeOverlayLoading,
      )

  }


  initLoadOnScrollBottom() {

    let {amntOfPixelsFromBottomBeforeRetrievingData} = this.params

    return  merge(
      fromEvent(this.params.elementToDetermineXFromBottom, 'scroll'),
      fromEvent(window, 'resize')
    )
      .pipe(
        takeUntil(this.ngUnsub),
        tap((res) => {

          let xPixelsFromTheBottom = this.determineXPixelsFromBottom();
          if(xPixelsFromTheBottom < amntOfPixelsFromBottomBeforeRetrievingData && !this.params.stopMakingAPICalls ){
            this.callAPIForMoreItems().subscribe()
          }
        })
      )

  }

  determineXPixelsFromBottom() {
    let element = this.params.elementToDetermineXFromBottom;

    let xPixelsFromTheBottom = Math.abs(
      ((element.scrollHeight - element.scrollTop) - element.clientHeight)
    );
    return xPixelsFromTheBottom;
  }

}

export class ScrollBottomPaginationParams {
  constructor(params:Partial<ScrollBottomPaginationParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  apiInfo!:{
    updateBody?:()=>any
    endpoint:string,
    method:"DELETE" | "GET" | "HEAD" | "JSONP" | "OPTIONS" |"PUT" |"POST" | any,
    altHttpRequest?:Observable<any>
  }
  amntOfPixelsFromBottomBeforeRetrievingData:number = 5
  populateItems!:(result)=> void
  notifyError!:(err,failedApiCalls)=> void
  elementToDetermineXFromBottom:HTMLElement =document.documentElement
  stopMakingAPICalls=false
}
