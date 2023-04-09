import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '@core/utility/utility.service';
import { ENV } from '@env/environment';
import { concatMap, iif, map, Observable, of, take, tap } from 'rxjs';
import { BaseService } from '@core/base/base.service';
import { FormGroup } from '@angular/forms';
import { WmlLabelParams, WMLField } from '@windmillcode/wml-field';
import { WmlInputComponent, WmlInputParams } from '@windmillcode/wml-input';
import { CandidacyInfoFormComponent, CandidacyInfoFormParams } from '@shared/components/candidacy-info-form/candidacy-info-form.component';
import { FileUploadComponent, FileUploadParams } from '@shared/components/file-upload/file-upload.component';

@Injectable({
  providedIn: 'root'
})
export class SpecificService extends BaseService {


  generateCandidacyInfoFileFormField=(params:{
    labelValue?:string,
    fieldFormControlName,
    fieldParentForm:FormGroup,
    errorMsgs?:WmlLabelParams["errorMsgs"],
    selfType?:WMLField["self"]["type"],
    fieldCustomParams?:FileUploadParams
  })=>{
      let {
        labelValue,
        fieldFormControlName,
        fieldParentForm,
        errorMsgs,
        selfType,
        fieldCustomParams
      } = params
    let wmlField
    wmlField = new WMLField({
      type: "custom",
      custom: {

        selfType: selfType ?? "standalone",
        fieldParentForm,
        fieldFormControlName,
        labelValue,
        fieldCustomCpnt:FileUploadComponent,
        fieldCustomMeta:fieldCustomParams ?? new FileUploadParams({}),
        errorMsgs: errorMsgs ?? {
          required:"global.errorRequired"
        }
      }
    })


    return this.generateFormField(wmlField)
  }
}
