import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBrandsComponent } from './other-brands.component';

describe('OtherBrandsComponent', () => {
  let component: OtherBrandsComponent;
  let fixture: ComponentFixture<OtherBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherBrandsComponent]
    });
    fixture = TestBed.createComponent(OtherBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
