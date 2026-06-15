import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncapsulationExperimentEmulated } from './encapsulation-experiment-emulated';

describe('EncapsulationExperimentEmulated', () => {
  let component: EncapsulationExperimentEmulated;
  let fixture: ComponentFixture<EncapsulationExperimentEmulated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncapsulationExperimentEmulated],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationExperimentEmulated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
