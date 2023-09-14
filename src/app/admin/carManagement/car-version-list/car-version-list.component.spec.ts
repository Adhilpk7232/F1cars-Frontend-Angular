import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVersionListComponent } from './car-version-list.component';

describe('CarVersionListComponent', () => {
  let component: CarVersionListComponent;
  let fixture: ComponentFixture<CarVersionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarVersionListComponent]
    });
    fixture = TestBed.createComponent(CarVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
