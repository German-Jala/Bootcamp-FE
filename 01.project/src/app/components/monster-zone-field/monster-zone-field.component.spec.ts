import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterZoneFieldComponent } from './monster-zone-field.component';

describe('MonsterZoneFieldComponent', () => {
  let component: MonsterZoneFieldComponent;
  let fixture: ComponentFixture<MonsterZoneFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterZoneFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterZoneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
