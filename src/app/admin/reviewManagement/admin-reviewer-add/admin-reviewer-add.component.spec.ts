import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewerAddComponent } from './admin-reviewer-add.component';

describe('AdminReviewerAddComponent', () => {
  let component: AdminReviewerAddComponent;
  let fixture: ComponentFixture<AdminReviewerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewerAddComponent]
    });
    fixture = TestBed.createComponent(AdminReviewerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
