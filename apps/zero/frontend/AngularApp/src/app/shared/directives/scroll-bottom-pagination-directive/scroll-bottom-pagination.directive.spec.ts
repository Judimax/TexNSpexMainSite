// @ts-nocheck
// angular
import { HttpResponse } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';

// services

// rxjs
import { finalize, of, Subject } from 'rxjs';
// misc
import { configureTestingModuleForDirectives } from '@core/utility/test-utils';
import { ScrollBottomPaginationDirective, ScrollBottomPaginationParams } from './scroll-bottom-pagination.directive';

describe('ScrollBottomPaginationDirective', () => {

  let directive:ScrollBottomPaginationDirective
  let fixture:ComponentFixture<any>
  let params:ScrollBottomPaginationParams
  let mockBaseService ={
    toggleOverlayLoadingSubj:{
      next:()=>{}
    },
    closeOverlayLoading:finalize(()=>{})
  }
  let mockHttpClient = {
    request:()=>of(new HttpResponse({body:"RESPONSE BODY"}))
  }
  beforeEach(() => {

    let result  = configureTestingModuleForDirectives(
      ScrollBottomPaginationDirective,
      () => {
        params = new ScrollBottomPaginationParams({
          apiInfo:{
            endpoint:"myEndpoint",
            method:"GET"
          },
          elementToDetermineXFromBottom:document.querySelector("div") as any,
          populateItems:({body:string})=>{
            // return "RESPONSE BODY"
          },
          notifyError:()=>{}
        })
        return params
      },
      {mockHttpClient,mockBaseService}
    )
    directive = result.directive
    fixture = result.fixture


  });

  describe("init", () => {

    it("should create", () => {
      expect(directive).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(directive.failedApiCalls).toEqual(0)
    })

    it("should have all properties be the correct class instance", () => {
      expect(directive.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(directive.params).toBeInstanceOf(ScrollBottomPaginationParams)
    })
  })

  describe("ngOnInit",()=>{

    it(` when called |
     as appropriate |
     does the required action `,()=>{

      // arrange
      spyOn(directive,"initLoadOnScrollBottom").and.callThrough()
      spyOn(directive,"callAPIForMoreItems").and.callThrough()

      // act
      directive.ngOnInit()

      // assert
      expect(directive.initLoadOnScrollBottom).toHaveBeenCalled()
      expect(directive.callAPIForMoreItems).toHaveBeenCalled()

    })

  })

  describe("ngOnDestroy",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      spyOn(directive.ngUnsub,"next")
      spyOn(directive.ngUnsub,"complete")

      // act
      directive.ngOnDestroy()

      // assert
      expect(directive.ngUnsub.next).toHaveBeenCalled()
      expect(directive.ngUnsub.complete).toHaveBeenCalled()


    })

  })

  describe("determineXPixelsFromBottom",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let element = params.elementToDetermineXFromBottom;
      let xPixelsFromTheBottom = Math.abs(
        ((element.scrollHeight - element.scrollTop) - element.clientHeight)
      );

      // act
      let result = directive.determineXPixelsFromBottom()

      // assert
      expect(result).toEqual(xPixelsFromTheBottom)
    })

  })

  describe("callAPIForMoreItems",()=>{

    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let obs$ = directive.callAPIForMoreItems()


      spyOn(params,"populateItems")

      // console.log(obs$)
      obs$.source.next = (a)=>{console.log()}
      obs$.source.operator(obs$)
      expect(params.populateItems).toHaveBeenCalledWith("RESPONSE BODY")


    })

    it(` when called |
     and there is an error |
     does the required action `,()=>{
      // arrange
      let err = "ERROR"
      let obs$ = directive.callAPIForMoreItems()
      spyOn(params,"notifyError")


      obs$.source.error = (a)=>{}

      obs$.source.operator({
        subscribe:(a)=>{
          a._error(err)
        }
      })


      // act
      expect(params.notifyError).toHaveBeenCalledWith(err,directive.failedApiCalls)




    })
  })

  describe("initLoadOnScrollBottom",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{

      // arrange
      let obs$ = directive.initLoadOnScrollBottom()

      spyOn(directive,"determineXPixelsFromBottom")

      // act
      obs$.next =(a)=>{}
      obs$.error =(a)=>{}
      obs$.complete =(a)=>{}
      obs$.operator({
        subscribe:(res)=> res._next(of(1))
      })

      // assert
      expect(directive.determineXPixelsFromBottom).toHaveBeenCalled()


    })

    it(` when called |
     and conditionas are met for an addition api call |
     does the required action `,()=>{

      // arrange
      params.stopMakingAPICalls = false
      spyOn(directive,"determineXPixelsFromBottom").and.returnValue(0)
      spyOn(directive,"callAPIForMoreItems").and.returnValue(of())
      let obs$ = directive.initLoadOnScrollBottom()


      // act
      obs$.next =(a)=>{}
      obs$.error =(a)=>{}
      obs$.complete =(a)=>{}
      obs$.operator({
        subscribe:(res)=> res._next(of(1))
      })

            // assert
      expect(directive.determineXPixelsFromBottom).toHaveBeenCalled()
      expect(directive.callAPIForMoreItems).toHaveBeenCalled()


    })

    it(` when called |
    and conditionas are met to stop making api call |
    does the required action `,()=>{

     // arrange
     params.stopMakingAPICalls = false
     spyOn(directive,"determineXPixelsFromBottom").and.returnValue(10)
     spyOn(directive,"callAPIForMoreItems").and.returnValue(of())
     let obs$ = directive.initLoadOnScrollBottom()


     // act
     obs$.next =(a)=>{}
     obs$.error =(a)=>{}
     obs$.complete =(a)=>{}
     obs$.operator({
       subscribe:(res)=> res._next(of(1))
     })

           // assert
     expect(directive.determineXPixelsFromBottom).toHaveBeenCalled()
     expect(directive.callAPIForMoreItems).not.toHaveBeenCalled()


   })
  })



});
