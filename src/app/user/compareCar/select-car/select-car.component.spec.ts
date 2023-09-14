import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCarComponent } from './select-car.component';

describe('SelectCarComponent', () => {
  let component: SelectCarComponent;
  let fixture: ComponentFixture<SelectCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCarComponent]
    });
    fixture = TestBed.createComponent(SelectCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
