// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit,  Input   } from '@angular/core';



// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';


// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@env/environment';
import { WMLButton2, WMLImage, WMLUIProperty } from '@windmillcode/wml-components-base';

import i18nTranslations from "src/assets/i18n/en.json";



@Component({

  selector: 'nav-zero',
  templateUrl: './nav-zero.component.html',
  styleUrls: ['./nav-zero.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class NavZeroComponent  {

  constructor(
    public cdref:ChangeDetectorRef,

    public utilService:UtilityService,
    public configService:ConfigService,
    public baseService:BaseService

  ) { }

  classPrefix = this.utilService.generateClassPrefix('NavZero')
  @Input('params') params: NavZeroParams = new NavZeroParams()
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()
  logoImg = new WMLImage({
    src:"assets/media/navZero/logo.png",
    alt:"NavZero.logoImgAlt"
  })

  menuItems = i18nTranslations.NavZero.menuItems
  .map((nullVal,index0)=>{
    return new WMLButton2({
      button:new WMLUIProperty({
        text:"NavZero.menuItems."+index0
      })
    })
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}



export class NavZeroParams {
  constructor(params:Partial<NavZeroParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}


