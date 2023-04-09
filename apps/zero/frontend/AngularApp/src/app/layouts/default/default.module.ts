import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
