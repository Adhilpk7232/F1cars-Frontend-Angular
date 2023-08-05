import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewManagementComponent } from './review-management.component';

describe('ReviewManagementComponent', () => {
  let component: ReviewManagementComponent;
  let fixture: ComponentFixture<ReviewManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewManagementComponent]
    });
    fixture = TestBed.createComponent(ReviewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
