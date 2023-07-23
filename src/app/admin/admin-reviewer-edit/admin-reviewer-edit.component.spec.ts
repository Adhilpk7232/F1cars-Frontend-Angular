import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewerEditComponent } from './admin-reviewer-edit.component';

describe('AdminReviewerEditComponent', () => {
  let component: AdminReviewerEditComponent;
  let fixture: ComponentFixture<AdminReviewerEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewerEditComponent]
    });
    fixture = TestBed.createComponent(AdminReviewerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
