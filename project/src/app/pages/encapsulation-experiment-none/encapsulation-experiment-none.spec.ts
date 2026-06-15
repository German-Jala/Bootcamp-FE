import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncapsulationExperimentNone } from './encapsulation-experiment-none';

describe('EncapsulationExperimentNone', () => {
  let component: EncapsulationExperimentNone;
  let fixture: ComponentFixture<EncapsulationExperimentNone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncapsulationExperimentNone],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationExperimentNone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
