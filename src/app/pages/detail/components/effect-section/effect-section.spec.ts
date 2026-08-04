import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { EffectSection } from './effect-section';
import { DetailPage } from '../../detail';
import { signal } from '@angular/core';

describe('EffectSection', () => {
  let component: EffectSection;
  let fixture: ComponentFixture<EffectSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectSection],
      providers: [
        {
          provide: DetailPage,
          useValue: {
            card: signal(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
