import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBrandShowComponent } from './review-brand-show.component';

describe('ReviewBrandShowComponent', () => {
  let component: ReviewBrandShowComponent;
  let fixture: ComponentFixture<ReviewBrandShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewBrandShowComponent]
    });
    fixture = TestBed.createComponent(ReviewBrandShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
