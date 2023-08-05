import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }
  admin_api = 'http://localhost:5000/admin';
  adminLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.admin_api}/login`, data,{ withCredentials: true });
  }
  active(){
    return this.http.get<any>(`${this.admin_api}/active`,{ withCredentials: true });
  }
  getusers(){
    return this.http.get<any>(`${this.admin_api}/users`,{ withCredentials: true });
  }
  verifyotp(otp:any){
    return this.http.post(`${this.admin_api}/otpVerify`,otp,{ withCredentials: true })
  }

  userRegister(data: FormData): Observable<any> {
    return this.http.post(`${this.admin_api}/signup`, data,{ withCredentials: true });
  }
}
