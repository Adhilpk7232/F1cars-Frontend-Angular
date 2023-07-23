import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealerAddComponent } from './admin-dealer-add.component';

describe('AdminDealerAddComponent', () => {
  let component: AdminDealerAddComponent;
  let fixture: ComponentFixture<AdminDealerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDealerAddComponent]
    });
    fixture = TestBed.createComponent(AdminDealerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
