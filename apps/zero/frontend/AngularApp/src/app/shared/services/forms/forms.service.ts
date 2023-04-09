import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ENV } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(

  ) { }

  questionaireOneMain = {
    mainForm: new FormGroup({
      [ENV.questionaireOneMain.mainForm.waitListIdFormControlName]:new FormControl(""),
      [ENV.questionaireOneMain.mainForm.cognitoUserIdFormControlName]:new FormControl("")
    })
  }

  profileOneMain={
    mainForm:new FormGroup({
      [ENV.profileOneMain.mainForm.jobDescFormControlName]:new FormControl("",[Validators.required]),
      [ENV.profileOneMain.mainForm.resumeFormControlName]:new FormArray([]),
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
