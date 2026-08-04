import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { PricesSection } from './prices-section';
import { DetailPage } from '../../detail';
import { signal } from '@angular/core';

describe('PricesSection', () => {
  let component: PricesSection;
  let fixture: ComponentFixture<PricesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesSection],
      providers: [
        {
          provide: DetailPage,
          useValue: {
            card: signal(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
