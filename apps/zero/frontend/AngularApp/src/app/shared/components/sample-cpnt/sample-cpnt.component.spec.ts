// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

import { SampleCpntComponent } from './sample-cpnt.component';

describe('SampleCpntComponent', () => {
  let cpnt: SampleCpntComponent;
  let fixture: ComponentFixture<SampleCpntComponent>;
  
  beforeEach(async () => {

    await configureTestingModuleForComponents(SampleCpntComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(SampleCpntComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })
});
