import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncapsulationExperimentShadow } from './encapsulation-experiment-shadow';

describe('EncapsulationExperimentShadow', () => {
  let component: EncapsulationExperimentShadow;
  let fixture: ComponentFixture<EncapsulationExperimentShadow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncapsulationExperimentShadow],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationExperimentShadow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
