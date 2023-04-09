// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit,  } from '@angular/core';



// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';


// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc

import { ENV } from '@env/environment';

import { SharedModule } from '@shared/shared.module';
export enum SITE_OFFLINE_ENUM {
  TRUE,FALSE
}

@Component({
  standalone:true,
  imports:[
    SharedModule
  ],
  selector: 'site-offline',
  templateUrl: './site-offline.component.html',
  styleUrls: ['./site-offline.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush



})
export class SiteOfflineComponent  {

  constructor(
    public cdref:ChangeDetectorRef,

    public utilService:UtilityService,
    public configService:ConfigService,
    public baseService:BaseService

  ) { }

  classPrefix = this.utilService.generateClassPrefix('SiteOffline')



  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}




