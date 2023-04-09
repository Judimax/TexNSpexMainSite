import { ChangeDetectionStrategy, Component } from "@angular/core";
import { WmlLabelComponent } from "@windmillcode/wml-field";

@Component({
  selector: 'custom-label',
  templateUrl: './custom-label.component.html',
  styleUrls: ['../../../../../node_modules/@windmillcode/wml-field/wml-label.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CustomLabelComponent extends WmlLabelComponent  {}
