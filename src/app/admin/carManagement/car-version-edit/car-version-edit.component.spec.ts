import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVersionEditComponent } from './car-version-edit.component';

describe('CarVersionEditComponent', () => {
  let component: CarVersionEditComponent;
  let fixture: ComponentFixture<CarVersionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarVersionEditComponent]
    });
    fixture = TestBed.createComponent(CarVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
