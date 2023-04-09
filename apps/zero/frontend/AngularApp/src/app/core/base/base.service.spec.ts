// testing
import {
  ChangeDetectorRefExtension,
  configureTestingModuleForServices,
} from '@core/utility/test-utils';
import { discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

// services
import { UtilityService } from '@core/utility/utility.service';

import { BaseService } from './base.service';
import { ChangeDetectorRef } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { WmlNotifyBarModel, WmlNotifyBarType } from '@windmillcode/wml-notify';
import { FormControl, FormGroup } from '@angular/forms';

describe('BaseService', () => {
  let service: BaseService;
  let utilService: UtilityService;

  beforeEach(() => {
    service = configureTestingModuleForServices(BaseService);
    utilService = TestBed.inject(UtilityService);
    service.appCdRef = new ChangeDetectorRefExtension();
  });

  describe('init', () => {
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('should have all values initalize properly', () => {});

    it('should have all properties be the correct class instance', () => {
      expect(service.appCdRef).toBeInstanceOf(ChangeDetectorRef);
      expect(service.toggleOverlayLoadingSubj).toBeInstanceOf(Subject);
      expect(service.playSiteAudioSubj).toBeInstanceOf(Subject);
      expect(service.toggleMobileNavSubj).toBeInstanceOf(Subject);
    });
  });

  describe('toggleOverlayLoadingSubj', () => {
    it(` when called |
     as appropriate |
     does the required action `, fakeAsync(() => {
      // arrange
      spyOn(service.appCdRef, 'detectChanges');

      service.toggleOverlayLoadingSubj$.subscribe(() => {
        // assert
        expect(service.appCdRef.detectChanges).toHaveBeenCalled();
        discardPeriodicTasks()

      });
      // act
      service.toggleOverlayLoadingSubj.next(true);
      flush();
      tick(400)
      flushMicrotasks()

    }));


  });

  describe('closePopup', () => {
    it(` when called |
     as appropriate |
     does the required action `, () => {
      // arrange
      spyOn(service.togglePopupSubj, 'next');

      // act
      service.closePopup();

      // assert
      expect(service.togglePopupSubj.next).toHaveBeenCalledWith(false);
    });
  });

  describe('generateWMLNote', () => {
    it(` when called |
     as appropriate |
     does the required action `, () => {
      // act
      let note = service.generateWMLNote();

      // assert
      expect(note).toBeInstanceOf(WmlNotifyBarModel);
      expect(note.custom.meta.i18nKey).toEqual('Success');
      expect(note.type).toEqual(WmlNotifyBarType.Success);
      expect(note.autoHide).toEqual(false);
    });
  });

  describe('generateInputFormField', () => {
    it(` when called |
     as appropriate |
     does the required action `, () => {
      // arrange
      spyOn(service, 'generateFormField').and.callThrough();
      let labelValue = 'a';
      let fieldFormControlName = 'b';
      let fieldParentForm = new FormGroup({
        [fieldFormControlName]: new FormControl(),
      });
      let errorMsgs = {
        required: '',
      };

      // act
      let formField = service.generateInputFormField(
        labelValue,
        fieldFormControlName,
        fieldParentForm,
        errorMsgs
      );

      // assert
      expect(service.generateFormField).toHaveBeenCalledWith(formField);
      expect(formField.label.custom.meta.labels[0][1].value).toEqual(
        labelValue
      );
      expect(formField.field.formControlName).toEqual('b');
      expect(formField.field.parentForm).toEqual(fieldParentForm);
      expect(formField.error.custom.meta.errorMsgs).toEqual(errorMsgs);
    });
  });

  describe('generateRangeFormField', () => {
    it(` when called |
     as appropriate |
     does the required action `, () => {
      // arrange
      spyOn(service, 'generateFormField').and.callThrough();
      let labelValue = 'a';
      let fieldFormControlName = 'b';
      let fieldParentForm = new FormGroup({
        [fieldFormControlName]: new FormControl(),
      });
      let errorMsgs = {
        required: '',
      };

      // act
      let formField = service.generateRangeFormField(
        labelValue,
        fieldFormControlName,
        fieldParentForm,
        errorMsgs
      );

      // assert
      expect(service.generateFormField).toHaveBeenCalledWith(formField);
      expect(formField.label.custom.meta.labels[0][1].value).toEqual(
        labelValue
      );
      expect(formField.field.formControlName).toEqual('b');
      expect(formField.field.parentForm).toEqual(fieldParentForm);
      expect(formField.field.custom.meta.type).toEqual('range');
      expect(formField.error.custom.meta.errorMsgs).toEqual(errorMsgs);
    });
  });

  describe('generateTextAreaFormField', () => {
    it(` when called |
    as appropriate |
    does the required action `, () => {
      // arrange
      spyOn(service, 'generateFormField').and.callThrough();
      let labelValue = 'a';
      let fieldFormControlName = 'b';
      let fieldParentForm = new FormGroup({
        [fieldFormControlName]: new FormControl(),
      });
      let errorMsgs = {
        required: '',
      };

      // act
      let formField = service.generateTextAreaFormField(
        labelValue,
        fieldFormControlName,
        fieldParentForm,
        errorMsgs
      );

      // assert
      expect(service.generateFormField).toHaveBeenCalledWith(formField);
      expect(formField.label.custom.meta.labels[0][1].value).toEqual(
        labelValue
      );
      expect(formField.field.formControlName).toEqual('b');
      expect(formField.field.parentForm).toEqual(fieldParentForm);
      expect(formField.field.custom.meta.type).toEqual('textarea');
      expect(formField.error.custom.meta.errorMsgs).toEqual(errorMsgs);
    });
  });

  describe('generateCheckboxFormField', () => {
    it(` when called |
    as appropriate |
    does the required action `, () => {
      // arrange
      spyOn(service, 'generateFormField').and.callThrough();
      let labelValue = 'a';
      let fieldFormControlName = 'b';
      let fieldParentForm = new FormGroup({
        [fieldFormControlName]: new FormControl(),
      });
      let errorMsgs = {
        required: '',
      };

      // act
      let formField = service.generateCheckboxFormField(
        labelValue,
        fieldFormControlName,
        fieldParentForm,
        errorMsgs
      );

      // assert
      expect(service.generateFormField).toHaveBeenCalledWith(formField);
      expect(formField.label.custom.meta.labels[0][1].value).toEqual(
        labelValue
      );
      expect(formField.field.formControlName).toEqual('b');
      expect(formField.field.parentForm).toEqual(fieldParentForm);
      expect(formField.field.custom.meta.type).toEqual('checkbox');
      expect(formField.field.custom.meta.checkboxDesc).toEqual(undefined);
      expect(formField.error.custom.meta.errorMsgs).toEqual(errorMsgs);
    });
  });

  describe("generateFormField",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{

    })
  })
});
