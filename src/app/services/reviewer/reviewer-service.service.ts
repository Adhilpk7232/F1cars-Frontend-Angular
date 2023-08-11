import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewerServiceService {

  constructor(private http:HttpClient) { }
  reviewer_api = 'http://localhost:5000/reviewer';

  saveToken(token: string) {
    localStorage.setItem('jwt_token_reviewer', token);
  }

  getToken() {
    return localStorage.getItem('jwt_token_reviewer');
  }

  removeToken() {
    localStorage.removeItem('jwt_token_reviewer');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }
  isActive(){
    return this.http.get(`${this.reviewer_api}/active`,{withCredentials:true})
  }
  getCarReviews(){
    return this.http.get(`${this.reviewer_api}/carReview`,{withCredentials:true})
  }
  getCarReviewDeatilsForUpdate(reviewId:String){
    return this.http.get(`${this.reviewer_api}/getReviewDetails/${reviewId}`,{withCredentials:true})
  }
}
