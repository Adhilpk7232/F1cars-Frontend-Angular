import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarsSliderComponent } from './brand-cars-slider.component';

describe('BrandCarsSliderComponent', () => {
  let component: BrandCarsSliderComponent;
  let fixture: ComponentFixture<BrandCarsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandCarsSliderComponent]
    });
    fixture = TestBed.createComponent(BrandCarsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
