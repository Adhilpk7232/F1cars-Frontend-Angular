import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreTextComponent } from './show-more-text.component';

describe('ShowMoreTextComponent', () => {
  let component: ShowMoreTextComponent;
  let fixture: ComponentFixture<ShowMoreTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMoreTextComponent]
    });
    fixture = TestBed.createComponent(ShowMoreTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
