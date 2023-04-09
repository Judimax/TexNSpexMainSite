// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';



// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';


// rxjs
import { Subject } from 'rxjs';

// misc

import { SharedModule } from '@shared/shared.module';
import { WMLImage } from '@windmillcode/wml-components-base';
import { ENV } from '@env/environment';
import { RouterModule } from '@angular/router';


@Component({

    standalone:true,
    imports:[
      SharedModule,
      RouterModule
    ],

  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush



})
export class NotFoundComponent  {

  constructor(
    public cdref:ChangeDetectorRef,

    public utilService:UtilityService,
    public configService:ConfigService,
    public baseService:BaseService

  ) { }

  classPrefix = this.utilService.generateClassPrefix('NotFound')

  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()
  ENV =ENV

  ngOnInit(): void {
  }

  someImg= new WMLImage({
    src:"assets/media/notFound/resume.jpg ",
    alt:"notFound.someImgAlt"
  })

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}
