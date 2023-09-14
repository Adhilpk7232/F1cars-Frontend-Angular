import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerChatComponent } from './reviewer-chat.component';

describe('ReviewerChatComponent', () => {
  let component: ReviewerChatComponent;
  let fixture: ComponentFixture<ReviewerChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewerChatComponent]
    });
    fixture = TestBed.createComponent(ReviewerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
