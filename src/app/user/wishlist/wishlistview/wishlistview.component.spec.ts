import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistviewComponent } from './wishlistview.component';

describe('WishlistviewComponent', () => {
  let component: WishlistviewComponent;
  let fixture: ComponentFixture<WishlistviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistviewComponent]
    });
    fixture = TestBed.createComponent(WishlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
