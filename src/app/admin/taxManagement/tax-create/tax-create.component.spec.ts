import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCreateComponent } from './tax-create.component';

describe('TaxCreateComponent', () => {
  let component: TaxCreateComponent;
  let fixture: ComponentFixture<TaxCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxCreateComponent]
    });
    fixture = TestBed.createComponent(TaxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
