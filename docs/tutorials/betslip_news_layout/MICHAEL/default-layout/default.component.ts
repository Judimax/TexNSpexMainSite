// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';



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
import { WMLTab, WMLTabsParams } from '@windmillcode/wml-tabs';

@Component({
  selector: 'default-layout',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent  {

  constructor(
    public cdref:ChangeDetectorRef,

    public utilService:UtilityService,
    public configService:ConfigService,
    public baseService:BaseService

  ) { }

  classPrefix = this.utilService.generateClassPrefix('DefaultLayout')

  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()


  betSlipTab = this.utilService.generateWmlTab("defaultBetslip.betSlipTabText",true)
  myBets = this.utilService.generateWmlTab("defaultBetslip.myBetsTabText")

  betSlip = new WMLTabsParams({
    tabs:[
      this.betSlipTab,
      this.myBets,
    ]
  })

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}
