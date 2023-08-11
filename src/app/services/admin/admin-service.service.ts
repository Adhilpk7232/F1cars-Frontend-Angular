import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }
  admin_api = 'http://localhost:5000/admin';

  saveToken(token: string) {
    localStorage.setItem('jwt_token_admin', token);
  }

  getToken() {
    return localStorage.getItem('jwt_token_admin');
  }

  removeToken() {
    localStorage.removeItem('jwt_token_admin');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  adminLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.admin_api}/login`, data,{ withCredentials: true });
  }
  active(){
    return this.http.get<any>(`${this.admin_api}/active`,{ withCredentials: true });
  }
  getusers(){
    return this.http.get<any>(`${this.admin_api}/users`,{ withCredentials: true });
  }
  resendOtp(){
    console.log("hello");
    
    return this.http.get<any>(`${this.admin_api}/otpResend`,{ withCredentials: true });
  }
  verifyotp(otp:any){
    return this.http.post(`${this.admin_api}/otpVerify`,otp,{ withCredentials: true })
  }
  logout(){
    return this.http.get<any>(`${this.admin_api}/logout`,{ withCredentials: true });
  }

  userRegister(data: FormData): Observable<any> {
    return this.http.post(`${this.admin_api}/signup`, data,{ withCredentials: true });
  }
  getPlanPackage(){
    return this.http.get<any>(`${this.admin_api}/getPlans`,{ withCredentials: true });
  }
  createPlan(){
    return this.http.post<any>(`${this.admin_api}/createPlan`,{ withCredentials: true });
  }
  deleteCar(carId:String){
    return this.http.get(`${this.admin_api}/getPlans/${carId}`,{ withCredentials: true })
  }
  getPlandetailsForUpdate(planId:any){
    return this.http.get(`${this.admin_api}/getPlanData/${planId}`,{ withCredentials: true })
  }
}
