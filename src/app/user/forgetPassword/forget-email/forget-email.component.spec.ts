import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetEmailComponent } from './forget-email.component';

describe('ForgetEmailComponent', () => {
  let component: ForgetEmailComponent;
  let fixture: ComponentFixture<ForgetEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetEmailComponent]
    });
    fixture = TestBed.createComponent(ForgetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
