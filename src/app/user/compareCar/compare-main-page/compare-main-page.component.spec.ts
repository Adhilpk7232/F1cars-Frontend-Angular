import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareMainPageComponent } from './compare-main-page.component';

describe('CompareMainPageComponent', () => {
  let component: CompareMainPageComponent;
  let fixture: ComponentFixture<CompareMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareMainPageComponent]
    });
    fixture = TestBed.createComponent(CompareMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
