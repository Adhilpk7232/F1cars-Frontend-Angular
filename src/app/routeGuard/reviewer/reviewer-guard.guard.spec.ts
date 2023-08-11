import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { reviewerGuardGuard } from './reviewer-guard.guard';

describe('reviewerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => reviewerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
