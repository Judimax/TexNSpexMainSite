// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc

@Component({
  selector: 'template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TemplateComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()

  initComponent(){

  }

  initUpdateComponent(){

  }


  ngOnInit(): void {
    this.initComponent()
    this.initUpdateComponent()

  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}
