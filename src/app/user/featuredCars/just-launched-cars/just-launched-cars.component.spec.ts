import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustLaunchedCarsComponent } from './just-launched-cars.component';

describe('JustLaunchedCarsComponent', () => {
  let component: JustLaunchedCarsComponent;
  let fixture: ComponentFixture<JustLaunchedCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JustLaunchedCarsComponent]
    });
    fixture = TestBed.createComponent(JustLaunchedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
