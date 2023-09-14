import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSinglePageComponent } from './car-single-page.component';

describe('CarSinglePageComponent', () => {
  let component: CarSinglePageComponent;
  let fixture: ComponentFixture<CarSinglePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarSinglePageComponent]
    });
    fixture = TestBed.createComponent(CarSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
