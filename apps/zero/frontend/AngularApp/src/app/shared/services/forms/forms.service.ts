import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { WMLValidatorFileExtensions } from '@core/utility/validators';
import { ENV } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(

  ) { }

  candidacyInfoForm = {
    mainForm:new FormGroup({
      [ENV.candidacyInfoForm.mainForm.companyFormControlName]:new FormControl(""),
      [ENV.candidacyInfoForm.mainForm.jobDescFormControlName]:new FormControl("",Validators.required),
      [ENV.candidacyInfoForm.mainForm.resumeFormControlName]:new FormArray([],WMLValidatorFileExtensions({ext:["docx","pdf"]})),
    })
  }

  questionaireOneMain = {
    mainForm: new FormGroup({
      [ENV.questionaireOneMain.mainForm.cognitoUserIdFormControlName]:new FormControl("")
    })
  }

  joinWaitlistForm = {
    mainForm:new FormGroup({
      [ENV.joinWaitlistForm.mainForm.nameFormControlName]:new FormControl("",Validators.required),
      [ENV.joinWaitlistForm.mainForm.emailFormControlName]:new FormControl("",Validators.email),
      [ENV.joinWaitlistForm.mainForm.phoneFormControlName]:new FormControl(""),
    })
  }
}
