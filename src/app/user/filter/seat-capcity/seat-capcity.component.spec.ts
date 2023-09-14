import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatCapcityComponent } from './seat-capcity.component';

describe('SeatCapcityComponent', () => {
  let component: SeatCapcityComponent;
  let fixture: ComponentFixture<SeatCapcityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatCapcityComponent]
    });
    fixture = TestBed.createComponent(SeatCapcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
