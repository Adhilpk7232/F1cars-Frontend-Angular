import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreFilterModalComponent } from './show-more-filter-modal.component';

describe('ShowMoreFilterModalComponent', () => {
  let component: ShowMoreFilterModalComponent;
  let fixture: ComponentFixture<ShowMoreFilterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMoreFilterModalComponent]
    });
    fixture = TestBed.createComponent(ShowMoreFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
