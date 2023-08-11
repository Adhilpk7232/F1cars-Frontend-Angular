import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarReviewComponent } from './edit-car-review.component';

describe('EditCarReviewComponent', () => {
  let component: EditCarReviewComponent;
  let fixture: ComponentFixture<EditCarReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarReviewComponent]
    });
    fixture = TestBed.createComponent(EditCarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
