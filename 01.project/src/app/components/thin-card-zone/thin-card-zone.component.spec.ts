import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardZoneComponent } from './thin-card-zone.component';

describe('ThinCardZoneComponent', () => {
  let component: CardZoneComponent;
  let fixture: ComponentFixture<CardZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
