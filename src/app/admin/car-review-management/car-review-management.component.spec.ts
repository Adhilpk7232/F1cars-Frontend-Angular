import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReviewManagementComponent } from './car-review-management.component';

describe('CarReviewManagementComponent', () => {
  let component: CarReviewManagementComponent;
  let fixture: ComponentFixture<CarReviewManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarReviewManagementComponent]
    });
    fixture = TestBed.createComponent(CarReviewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
