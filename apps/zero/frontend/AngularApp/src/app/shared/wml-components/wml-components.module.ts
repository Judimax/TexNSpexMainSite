// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// wml components
import { WmlNotifyModule } from '@windmillcode/wml-notify';
import { WmlPopupModule } from '@windmillcode/wml-popup';
import { WmlFieldModule } from '@windmillcode/wml-field';
import { WmlFormModule } from '@windmillcode/wml-form';
import { WmlInputModule } from '@windmillcode/wml-input';
import { WmlChipsModule } from '@windmillcode/wml-chips';
import { WmlOptionsModule } from '@windmillcode/wml-options';
import { WmlSliceboxModule } from '@windmillcode/wml-slicebox';
import { WmlFileManagerModule } from '@windmillcode/wml-file-manager';
import {PenroseModule} from "@windmillcode/penrose";
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PenroseModule,
    WmlFieldModule,
    WmlFormModule,
    WmlInputModule,
    WmlNotifyModule,
    WmlPopupModule,
    WmlChipsModule,
    WmlOptionsModule,
    WmlSliceboxModule,
    WmlFileManagerModule
  ]
})
export class WmlComponentsModule { }
