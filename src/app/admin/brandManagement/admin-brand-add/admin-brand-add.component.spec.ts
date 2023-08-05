import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandAddComponent } from './admin-brand-add.component';

describe('AdminBrandAddComponent', () => {
  let component: AdminBrandAddComponent;
  let fixture: ComponentFixture<AdminBrandAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBrandAddComponent]
    });
    fixture = TestBed.createComponent(AdminBrandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
