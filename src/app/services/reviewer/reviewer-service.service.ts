import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReviewerConnectionRes } from 'src/app/models/reviewerConnectionRes';
import { environmet } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewerServiceService {

  constructor(private http:HttpClient) { }

  reviewer_api = `${environmet.api}/reviewer`;


  loadimage(image:string){
    return (`${environmet.api}/public/brandImages/${image}`)
  }

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
  getconnection(){
    return this.http.get<any>(`${this.reviewer_api}/findConnection`,{withCredentials:true})
  }
  getReviewerId(){
    return this.http.get<string>(`${this.reviewer_api}/getReviewerId`,{withCredentials:true})
  }
  getMessages(connectionId:string){
    return this.http.get(`${this.reviewer_api}/getMessages/${connectionId}`,{withCredentials:true})
  }
  getChattingReviewer(connectioId:string){
    return this.http.get(`${this.reviewer_api}/getChattingReviewer/${connectioId}`,{withCredentials:true})
  }
  sendMessage(reviewerId:String,form:FormData){   
    return this.http.post(`${this.reviewer_api}/sendMessage/${reviewerId}`,form,{withCredentials:true})
  }
  getbrand(){
    return this.http.get(`${this.reviewer_api}/brand`,{
      withCredentials:true
    })
  }
  getCars(BrandId:any){
    return this.http.get(`${this.reviewer_api}/cars/${BrandId}`,{
      withCredentials:true
    })
  }
  addCarReview(formData:any){
    return this.http.post(`${this.reviewer_api}/addReview`,formData,{
      withCredentials: true
    })
  }
  updateReview(reviewId:string,formData:any){
    return this.http.post(`${this.reviewer_api}/updateReview/${reviewId}`,formData,{
      withCredentials: true
    })
  }
  logout(){

    return this.http.post(`${this.reviewer_api}/logout`,{
      withCredential:true
    })
  }
  login(formData:any){
    return this.http.post(`${this.reviewer_api}/login`,formData,{
      withCredentials: true
    })
  }
}
