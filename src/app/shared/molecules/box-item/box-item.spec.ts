import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxItem } from './box-item';

describe('BoxItem', () => {
  let component: BoxItem;
  let fixture: ComponentFixture<BoxItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
