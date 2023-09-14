import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarlistingComponent } from './brand-carlisting.component';

describe('BrandCarlistingComponent', () => {
  let component: BrandCarlistingComponent;
  let fixture: ComponentFixture<BrandCarlistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandCarlistingComponent]
    });
    fixture = TestBed.createComponent(BrandCarlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
