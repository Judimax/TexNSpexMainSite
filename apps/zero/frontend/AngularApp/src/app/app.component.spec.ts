// angular
import { AppComponent } from './app.component';
import { Router, Routes } from '@angular/router';
import {Location} from "@angular/common";

// testing
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@core/utility/test-utils';

// wml componnts

// rxjs
import { of, Subject } from 'rxjs';

// params
import { MobileNavItemParams } from '../../projects/mobile-nav/src/lib/mobile-nav-item/mobile-nav-item.component';
import { Component, ViewContainerRef } from '@angular/core';
import { environment as env } from '@env/environment';
import { ENV } from '@env/environment';



@Component({
  template:`
  <div></div>
  `
})
class TestRouteComponent {

}

describe('AppComponent', () => {

  let fixture:ComponentFixture<any>
  let cpnt:AppComponent
  let mockHttpClient = {
    get:(val)=> of()
  }
  let router:Router
  let location:Location
  let routes: Routes = [
    {path: '',  component: AppComponent},
    {path: 'route', component: TestRouteComponent},
  ];



  beforeEach(async () => {
    await configureTestingModuleForComponents(
      AppComponent,
      {mockTranslateService,mockHttpClient},
      routes
    );
    ({fixture, cpnt} =  grabComponentInstance(AppComponent));

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges()

    fixture.ngZone?.run(()=>{
      router.initialNavigation()
    })
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {


    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      ;[
        cpnt.headerMobileNavItem,
        cpnt.teamMobileNavItem,
        cpnt.eventsMobileNavItem,
        cpnt.playSiteAudioMobileBtnItem,
        cpnt.addToSpotfiyMobileBtnItem,
        cpnt.playSiteAudioMobileBtnItem,
        cpnt.addToSpotfiyMobileBtnItem,
        cpnt.signInNavItem,
        cpnt.profileNavItem,
        cpnt.signOutNavItem
      ].forEach((btnItem)=>{
        expect(btnItem).toBeInstanceOf(MobileNavItemParams)
      })
    })
  })

  describe("ngOnInit",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      spyOn(cpnt,"doMiscConfigs")

      // act
      cpnt.ngOnInit()

      // assert
      expect(cpnt.doMiscConfigs).toHaveBeenCalled()
    })
  })


  describe("ngOnDestroy",()=>{

    beforeEach(()=>{
      spyOn(cpnt.ngUnsub,'next')
      spyOn(cpnt.ngUnsub,'complete')
    })

    it(` when called |
     as appropriate |
     does the required action `,()=>{
        // act
        cpnt.ngOnDestroy();

        // assert
        expect(cpnt.ngUnsub.next).toHaveBeenCalled();
        expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })

  describe("navigateWhenMobileNavItemIsClicked",()=>{
    it(` when called |
     as appropriate |
     does the required action `,fakeAsync(()=>{
      // arrange
      let clickFn = cpnt.navigateWhenMobileNavItemIsClicked("route")
      let event = {
        preventDefault:()=>{}
      }
      spyOn(event,"preventDefault")
      spyOn(cpnt.baseService.toggleMobileNavSubj,"next" )
      // assert
      expect(clickFn).toBeInstanceOf(Function)

      // act
      ;(fixture as any).ngZone.run(()=>{

        clickFn(event)
      })
      flush();

      // assert
      expect(event.preventDefault).toHaveBeenCalled()
      expect(cpnt.baseService.toggleMobileNavSubj.next).toHaveBeenCalledWith(false)
      expect(location.path()).toEqual("/route")

    }))
  })

  describe("doMiscConfigs",()=>{

    let http
    beforeEach(()=>{
      http = (cpnt as any).http
    })

    it(` when called |
     as appropriate |
     does the required action `,()=>{

      // arrange
      spyOn(http,"get").and.callThrough()

      // act
      cpnt.doMiscConfigs()

      // assert
      expect(http.get).toHaveBeenCalledWith(ENV.app.backendHealthCheck())
      expect(cpnt.baseService.appCdRef).toEqual((cpnt as any).cdref)
    })

    it(` when called |
    and env.production === true |
    does the required action `,()=>{
     // arrange
     env.production = true
     let vcf:ViewContainerRef = (cpnt as any).vcf
     spyOn(vcf.element.nativeElement,"removeAttribute")
     spyOn(http,"get").and.callThrough()

     // act
     cpnt.doMiscConfigs()

     // assert
     expect(vcf.element.nativeElement.removeAttribute).toHaveBeenCalledWith("ng-version")
     expect(http.get).toHaveBeenCalledWith(ENV.app.backendHealthCheck())
     expect(cpnt.baseService.appCdRef).toEqual((cpnt as any).cdref)
   })
  })

  describe("openSiteUnderConstructionBanner",()=>{

    beforeEach(()=>{

      sessionStorage.setItem(ENV.classPrefix.app, "{}")
      ;(cpnt.webStorage as any) = {}
    })
    it(` when called |
     under normal conditions |
     does the required action `,()=>{
       // arrange
       spyOn(sessionStorage,"getItem").and.callThrough()
       spyOn(JSON,"parse").and.callThrough()
       spyOn(Object,"assign").and.callThrough()
       spyOn(cpnt.baseService,"generateWMLNote").and.callThrough()
       spyOn(cpnt.wmlNotifyService,"create").and.callThrough()

       // act
       cpnt.openSiteUnderConstructionBanner()

      // assert
      expect(sessionStorage.getItem).toHaveBeenCalledWith(ENV.classPrefix.app)
      expect(JSON.parse).toHaveBeenCalledWith(sessionStorage.getItem(ENV.classPrefix.app))
      expect(Object.assign).toHaveBeenCalled()
      expect(cpnt.webStorage.siteUnderConstructionBannerWasOpened).toEqual(true)

      // expect(cpnt.baseService.generateWMLNote).toHaveBeenCalledWith("app.siteUnderConstruction",WmlNotifyBarType.Info,true)
      expect(cpnt.wmlNotifyService.create).toHaveBeenCalled()

    })
  })

});
