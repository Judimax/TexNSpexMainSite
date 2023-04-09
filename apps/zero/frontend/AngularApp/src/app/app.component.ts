// angular
import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { catchError, forkJoin, merge, of, pipe, Subject, takeUntil, tap, timer } from 'rxjs';

// services
import { BaseService, GenerateMobileNavBtnItemParams } from '@core/base/base.service';

// misc
import { ENV,environment as env } from '@env/environment';
import {  UtilityService } from '@core/utility/utility.service';


// wml-components
import { WMLImage } from '@windmillcode/wml-components-base';
import { HttpClient } from '@angular/common/http';
import { WmlNotifyBarType, WmlNotifyService } from '@windmillcode/wml-notify';
import { AutomateService } from '@helpers/automation/automation/automation.service';
import { toggleDarkMode } from '@core/utility/common-utils';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  constructor(
    public baseService: BaseService,
    public utilService: UtilityService,
    public cdref: ChangeDetectorRef,
    public vcf: ViewContainerRef,
    public router:Router,
    public http:HttpClient,
    public wmlNotifyService:WmlNotifyService,
    public automateService:AutomateService,
  ) {
    this.listenForChangesOutSideChangeDetection().subscribe()
  }

  classPrefix = this.utilService.generateClassPrefix(ENV.classPrefix.app)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub = new Subject<void>()
  webStorage = {
    siteUnderConstructionBannerWasOpened:false
  }


  openSiteUnderConstructionBanner = ()=>{
    let webStorage =sessionStorage.getItem(ENV.classPrefix.app)
    webStorage = JSON.parse(webStorage)
    Object.assign(this.webStorage, webStorage)
    if(!this.webStorage.siteUnderConstructionBannerWasOpened){
      this.webStorage.siteUnderConstructionBannerWasOpened = true
      sessionStorage.setItem(ENV.classPrefix.app, JSON.stringify(this.webStorage))

      this.baseService.generateWMLNote("global.siteUnderConstruction",WmlNotifyBarType.Info,true)
      this.cdref.detectChanges()

    }

  }


  listenForChangesOutSideChangeDetection = ()=>{
    return merge(
      this.baseService.togglePopupSubj,
      this.baseService.toggleOverlayLoadingSubj
    )
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.cdref.detectChanges()
      })
    )

  }

  ngOnInit() {
    this.doMiscConfigs()
    toggleDarkMode(true)


  }

  ngAfterViewInit (){
    this.openSiteUnderConstructionBanner()
    this.cdref.detectChanges()
  }

  doMiscConfigs() {
    if (env.production) {
      this.vcf.element.nativeElement.removeAttribute("ng-version");
    }

    this.baseService.appCdRef = this.cdref
    ENV.nav.urls.initialURL = window.location.pathname
    this.http.get(ENV.app.backendHealthCheck())
    .pipe(
      takeUntil(this.ngUnsub),
      catchError(()=>{
        this.baseService.generateWMLNote("app.startBackend",WmlNotifyBarType.Info,true)
        return timer(5000)
        .pipe(
          takeUntil(this.ngUnsub),
          tap(()=>{
            this.baseService.generateWMLNote("global.siteUnderConstruction",WmlNotifyBarType.Info)
            this.cdref.detectChanges()
          })
        )

      }),

    )
    .subscribe()
  }

  ngOnDestroy() {
    this.ngUnsub.next()
    this.ngUnsub.complete()
  }

}
