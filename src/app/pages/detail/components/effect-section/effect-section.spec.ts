import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectSection } from './effect-section';

describe('EffectSection', () => {
  let component: EffectSection;
  let fixture: ComponentFixture<EffectSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectSection],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
