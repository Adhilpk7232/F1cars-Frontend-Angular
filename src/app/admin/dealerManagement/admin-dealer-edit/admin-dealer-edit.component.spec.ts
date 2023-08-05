import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealerEditComponent } from './admin-dealer-edit.component';

describe('AdminDealerEditComponent', () => {
  let component: AdminDealerEditComponent;
  let fixture: ComponentFixture<AdminDealerEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDealerEditComponent]
    });
    fixture = TestBed.createComponent(AdminDealerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
