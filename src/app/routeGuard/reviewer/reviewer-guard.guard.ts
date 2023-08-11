import { CanActivateFn } from '@angular/router';

export const reviewerGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
