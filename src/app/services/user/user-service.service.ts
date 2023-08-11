import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  user_api = 'http://localhost:5000';


  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  userLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.user_api}/login`, data,{ withCredentials: true });
  }
  resendOtp(){
    return this.http.get<any>(`${this.user_api}/otpResend`,{ withCredentials: true });
  }
  verifyotp(otp:any){
    return this.http.post(`${this.user_api}/otpVerify`,otp,{ withCredentials: true })
  }

  userRegister(data: FormData): Observable<any> {
    return this.http.post(`${this.user_api}/register`, data,{ withCredentials: true });
  }
  logout(){
    return this.http.get<any>(`${this.user_api}/logout`,{ withCredentials: true });
  }
  forgetPasswordUserFind(user:any){
    return this.http.post<any>(`${this.user_api}/forgetPassword`,user,{withCredentials:true});
  }
  resetPassword(data:FormData,email:String){
    console.log("hello");
    
    return this.http.post<any>(`${this.user_api}/resetPassword/${email}`,data,{withCredentials:true});
  }
  getPopularCars(){
    return this.http.get(`${this.user_api}/popularCars`,{withCredentials:true})
  }
  getJustLaunched(){
    return this.http.get(`${this.user_api}/justLaunched`,{withCredentials:true})
  }
  getUpcommingCars(){
    return this.http.get(`${this.user_api}/upcommingCars`,{withCredentials:true})
  }
  getBrands(){
    return this.http.get(`${this.user_api}/getBrands`,{withCredentials:true})
  }
  getplans(){
    return this.http.get<any>(`${this.user_api}/getPlans`,{withCredentials:true})
  }
}
