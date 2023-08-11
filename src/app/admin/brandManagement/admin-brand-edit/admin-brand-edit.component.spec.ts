import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandEditComponent } from './admin-brand-edit.component';

describe('AdminBrandEditComponent', () => {
  let component: AdminBrandEditComponent;
  let fixture: ComponentFixture<AdminBrandEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBrandEditComponent]
    });
    fixture = TestBed.createComponent(AdminBrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
