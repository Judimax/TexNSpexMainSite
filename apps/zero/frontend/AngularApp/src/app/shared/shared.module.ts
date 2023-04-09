// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

// wml components
import { WmlComponentsModule } from './wml-components/wml-components.module';

// i18n
import { TranslateModule } from '@ngx-translate/core';



import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';


// material
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';

// misc

import { ScrollBottomPaginationDirective } from './directives/scroll-bottom-pagination-directive/scroll-bottom-pagination.directive';
import { CustomLabelComponent } from './components/custom-label/custom-label.component';
import { NotifyBannerComponent } from './components/notify-banner/notify-banner.component';



let components = [
  OverlayLoadingComponent,
  ScrollBottomPaginationDirective,
  CustomLabelComponent,
  NotifyBannerComponent

]

let materialModules =[
  MatMenuModule,
  MatCardModule,
  MatSlideToggleModule
]
let modules = [
  TranslateModule,
  CommonModule,
  NgOptimizedImage,
  WmlComponentsModule,
  ...materialModules
]
@NgModule({
  imports:[
    ...modules,
    RouterModule,
  ],
  exports: [
    ...components,
    ...modules,
    HttpClientModule,
  ],
  providers:[

  ],
  declarations: [
    ...components,

  ]
})
export class SharedModule { }
