import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,CanActivate,Router, RouterStateSnapshot,UrlTree,} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class reviewerGuardGuard{
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const jwtToken = localStorage.getItem('jwt_token_reviewer');
    const loginRoute = '/reviewer';
    // const signupRoute = '/professiona/signup';
  
    if (
      state.url !== loginRoute &&
      // state.url !== signupRoute &&
      jwtToken === null
    ) {
      this.router.navigate(['/reviewer']);
      return false;
    } else if (
      (state.url === loginRoute ) &&
      jwtToken !== null
    ) {
      this.router.navigate(['/reviewer/reviewerHome']);
      return false;
    }
    return true;
  }
};



@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate() {
    const admin = localStorage.getItem('jwt_token_admin');
    const user = localStorage.getItem('jwt_token');
    if (admin) {
      this.router.navigate(['/admin/adminHome']);
      return false;
    } else if (user) {
       this.router.navigate(['/']);
       return false;
    } else {
      return true;
    }
  }
}

