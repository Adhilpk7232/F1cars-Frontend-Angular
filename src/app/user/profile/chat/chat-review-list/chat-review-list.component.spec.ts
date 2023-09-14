import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReviewListComponent } from './chat-review-list.component';

describe('ChatReviewListComponent', () => {
  let component: ChatReviewListComponent;
  let fixture: ComponentFixture<ChatReviewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatReviewListComponent]
    });
    fixture = TestBed.createComponent(ChatReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
