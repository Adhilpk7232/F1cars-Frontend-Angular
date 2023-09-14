import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddVersionComponent } from './car-add-version.component';

describe('CarAddVersionComponent', () => {
  let component: CarAddVersionComponent;
  let fixture: ComponentFixture<CarAddVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarAddVersionComponent]
    });
    fixture = TestBed.createComponent(CarAddVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
