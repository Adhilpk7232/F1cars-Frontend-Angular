import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCarShowComponent } from './review-car-show.component';

describe('ReviewCarShowComponent', () => {
  let component: ReviewCarShowComponent;
  let fixture: ComponentFixture<ReviewCarShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewCarShowComponent]
    });
    fixture = TestBed.createComponent(ReviewCarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
