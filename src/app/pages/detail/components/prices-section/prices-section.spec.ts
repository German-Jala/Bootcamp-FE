import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesSection } from './prices-section';

describe('PricesSection', () => {
  let component: PricesSection;
  let fixture: ComponentFixture<PricesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
