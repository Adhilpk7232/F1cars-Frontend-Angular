import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTypeComponent } from './body-type.component';

describe('BodyTypeComponent', () => {
  let component: BodyTypeComponent;
  let fixture: ComponentFixture<BodyTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyTypeComponent]
    });
    fixture = TestBed.createComponent(BodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
