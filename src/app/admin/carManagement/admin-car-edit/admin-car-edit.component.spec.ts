import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarEditComponent } from './admin-car-edit.component';

describe('AdminCarEditComponent', () => {
  let component: AdminCarEditComponent;
  let fixture: ComponentFixture<AdminCarEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarEditComponent]
    });
    fixture = TestBed.createComponent(AdminCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
