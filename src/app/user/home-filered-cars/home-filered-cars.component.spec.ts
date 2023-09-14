import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFileredCarsComponent } from './home-filered-cars.component';

describe('HomeFileredCarsComponent', () => {
  let component: HomeFileredCarsComponent;
  let fixture: ComponentFixture<HomeFileredCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFileredCarsComponent]
    });
    fixture = TestBed.createComponent(HomeFileredCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
