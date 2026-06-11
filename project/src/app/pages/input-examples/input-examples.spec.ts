import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputExamples } from './input-examples';

describe('InputExamples', () => {
  let component: InputExamples;
  let fixture: ComponentFixture<InputExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputExamples],
    }).compileComponents();

    fixture = TestBed.createComponent(InputExamples);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
