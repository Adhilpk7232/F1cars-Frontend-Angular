import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOTPComponent } from './admin-otp.component';

describe('AdminOTPComponent', () => {
  let component: AdminOTPComponent;
  let fixture: ComponentFixture<AdminOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOTPComponent]
    });
    fixture = TestBed.createComponent(AdminOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
