import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpCommingCarsComponent } from './up-comming-cars.component';

describe('UpCommingCarsComponent', () => {
  let component: UpCommingCarsComponent;
  let fixture: ComponentFixture<UpCommingCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpCommingCarsComponent]
    });
    fixture = TestBed.createComponent(UpCommingCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
