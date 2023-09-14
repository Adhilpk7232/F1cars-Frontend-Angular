import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user/user-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public userService:UserServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token =  this.userService.getToken()
    // console.log(token,"TTTT");
    
    let reviewerToken=localStorage.getItem("jwt_token_reviewer")
    let admintoken=localStorage.getItem("jwt_token_admin")
 
    // console.log(token,"token");
    
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      
      // console.log(newRequest,"newre");
      
      return next.handle(newRequest);
    }
    if (reviewerToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + reviewerToken)
      });
     
      
      return next.handle(newRequest);
    }
    if (admintoken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + admintoken)
      });
     
      
      return next.handle(newRequest);
    }

    return next.handle(request);

    
  }
}
