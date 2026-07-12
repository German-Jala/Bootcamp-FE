import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyResultsView } from './empty-results-view';

describe('EmptyResultsView', () => {
  let component: EmptyResultsView;
  let fixture: ComponentFixture<EmptyResultsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyResultsView],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyResultsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
