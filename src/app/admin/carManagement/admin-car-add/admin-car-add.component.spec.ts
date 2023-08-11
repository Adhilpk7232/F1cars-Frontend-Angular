import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarAddComponent } from './admin-car-add.component';

describe('AdminCarAddComponent', () => {
  let component: AdminCarAddComponent;
  let fixture: ComponentFixture<AdminCarAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarAddComponent]
    });
    fixture = TestBed.createComponent(AdminCarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
