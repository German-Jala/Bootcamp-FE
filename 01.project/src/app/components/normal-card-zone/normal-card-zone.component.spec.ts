import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalCardZoneComponent } from './normal-card-zone.component';

describe('NormalCardZoneComponent', () => {
  let component: NormalCardZoneComponent;
  let fixture: ComponentFixture<NormalCardZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalCardZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalCardZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
