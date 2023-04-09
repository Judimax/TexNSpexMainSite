import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUtilityService } from 'src/app/app-utility.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {

  @Input() is_page_scrolled: boolean = false;
  
  is_banner_open: boolean = false;
  banner_text!: string;
  banner_control_sub!: Subscription;
  
  constructor(
    private global_utilities: AppUtilityService
  ){}

  ngOnInit(): void {
    let banner_control = this.global_utilities.getGlobalData('banner_control');
    this.banner_control_sub = banner_control.subscribe(
      (options: any) => {
        if(options.to_show){
          setTimeout(()=>{
            this.banner_text = options.text;
            this.is_banner_open = true;
          },1200);
        }else{
          this.dismissBanner();
        }
      }
    );
  }

  dismissBanner(){
    this.banner_text = '';
    this.is_banner_open = false;
  }

  ngOnDestroy(){
    this.global_utilities.unsubscribeAll([
      this.banner_control_sub
    ]);
  }

}
