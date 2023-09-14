import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSinglePageComponent } from './review-single-page.component';

describe('ReviewSinglePageComponent', () => {
  let component: ReviewSinglePageComponent;
  let fixture: ComponentFixture<ReviewSinglePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewSinglePageComponent]
    });
    fixture = TestBed.createComponent(ReviewSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
