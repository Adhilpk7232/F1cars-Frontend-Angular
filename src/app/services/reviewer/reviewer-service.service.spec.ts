import { TestBed } from '@angular/core/testing';

import { ReviewerServiceService } from './reviewer-service.service';

describe('ReviewerServiceService', () => {
  let service: ReviewerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
