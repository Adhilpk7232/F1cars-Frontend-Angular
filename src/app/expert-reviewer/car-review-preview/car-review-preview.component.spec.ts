import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReviewPreviewComponent } from './car-review-preview.component';

describe('CarReviewPreviewComponent', () => {
  let component: CarReviewPreviewComponent;
  let fixture: ComponentFixture<CarReviewPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarReviewPreviewComponent]
    });
    fixture = TestBed.createComponent(CarReviewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
