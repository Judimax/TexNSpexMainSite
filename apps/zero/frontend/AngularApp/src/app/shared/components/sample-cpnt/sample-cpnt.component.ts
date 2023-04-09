import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { Subject } from 'rxjs';

// i18n

@Component({
  selector: 'sample-cpnt',
  templateUrl: './sample-cpnt.component.html',
  styleUrls: ['./sample-cpnt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleCpntComponent implements OnInit {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()
  amount=Array(4).fill(null)

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


export class SampleCpntMeta{
  constructor(params:Partial<SampleCpntMeta>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}
