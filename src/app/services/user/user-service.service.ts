import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from 'src/app/models/loginForm';
import { otpFrom } from 'src/app/models/otpFormmodel';
import { forgetPassForm } from 'src/app/models/forgetPassEmailForm';
import { UserModel } from 'src/app/models/userModel';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { carModel } from 'src/app/models/carModel';
import { addWishlistApi } from 'src/app/models/addWishlistRes';
import { ApiResponse } from 'src/app/models/apiResponse';
import { CarReview } from 'src/app/models/reviewModel';
import { BrandModel } from 'src/app/models/brandModel';
import { SubscriptionPlan } from 'src/app/models/subscriptionPlan';
import { userIdRes } from 'src/app/models/userIdRes';
import { HttpParams } from '@angular/common/http';
import { findConnectionData } from 'src/app/models/findConnectionRes';
import { SingleTaxData } from 'src/app/models/SingleTaxData';
import { getfilterDataRes } from 'src/app/models/getFilterDataRes';
import { UserDataState } from 'src/app/models/userDataSate';
import { environmet } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  // user_api = 'http://localhost:3000';
  user_api = environmet.api


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

  userLogin(data:LoginForm): Observable<any> {
    
    
    return this.http.post<any>(`${this.user_api}/login`, data,{ withCredentials: true });
  }
  resendOtp(email:string){
    return this.http.get<ApiResponse>(`${this.user_api}/otpResend/${email}`,{ withCredentials: true });
  }
  verifyotp(otp:otpFrom,email:string){
    console.log(otp,'logtype');
    return this.http.post(`${this.user_api}/otpVerify/${email}`,otp,{ withCredentials: true })
  }

  userRegister(data: FormData): Observable<any> {
    return this.http.post(`${this.user_api}/register`, data,{ withCredentials: true });
  }
  logout(){
    return this.http.get<ApiResponse>(`${this.user_api}/logout`,{ withCredentials: true });
  }
  forgetPasswordUserFind(user:forgetPassForm){
    return this.http.post<UserModel>(`${this.user_api}/forgetPassword`,user,{withCredentials:true});
  }
  postOtp(otp:FormData){
    return this.http.post<ApiResponse>(`${this.user_api}/forgetOptpVerify`,otp,{withCredentials:true});
  }
  resetPassword(data:FormData,email:String){
    console.log("hello");
    
    return this.http.post<ApiResponse>(`${this.user_api}/resetPassword/${email}`,data,{withCredentials:true});
  }
  getPopularCars(){
    return this.http.get<CarBrand[]>(`${this.user_api}/popularCars`,{withCredentials:true})
  }
  getJustLaunched(){
    return this.http.get<CarBrand[]>(`${this.user_api}/justLaunched`,{withCredentials:true})
  }
  getUpcommingCars(){
    return this.http.get<CarBrand[]>(`${this.user_api}/upcommingCars`,{withCredentials:true})
  }
  getBrands(){
    return this.http.get<BrandModel[]>(`${this.user_api}/getBrands`,{withCredentials:true})
  }
  getplans(){
    return this.http.get<SubscriptionPlan[]>(`${this.user_api}/getPlans`,{withCredentials:true})
  }
  getUserDetails(){
    return this.http.get<UserDataState>(`${this.user_api}/getUserDetails`,{withCredentials:true})
  }
  updateUser(data:FormData){
    return this.http.post(`${this.user_api}/updateUser`,data,{withCredentials:true})
  }
  updateProfile(data:FormData): Observable<any>{
    return this.http.post(`${this.user_api}/updateProfile`,data,{withCredentials:true})
  }
  findPlan(planId:string){
    console.log(planId);
    
    return this.http.get<SubscriptionPlan>(`${this.user_api}/getSelectedPlan/${planId}`,{withCredentials:true})
  }
  planActivate(data:any): Observable<any>{
    return this.http.post<ApiResponse>(`${this.user_api}/planActivate`,data,{withCredentials:true})
  }
  getReviewers(){
    return this.http.get(`${this.user_api}/getReviewer`,{withCredentials:true})
  }
  createConnection(reviewerId:string){
    return this.http.get(`${this.user_api}/createConnection/${reviewerId}`,{withCredentials:true})
  }
  findConnection(){
    return this.http.get<findConnectionData>(`${this.user_api}/findConnection`,{withCredentials:true})
  }
  getStates(){
    return this.http.get(`${this.user_api}/getStates`,{withCredentials:true})
  }
  checkPlanExist(){
    return this.http.get(`${this.user_api}/checkingPlanExist`,{withCredentials:true})
  }
  getCarDetails(carId:string|null){
    return this.http.get<CarBrand>(`${this.user_api}/geCarDetails/${carId}`,{withCredentials:true})
  }
  getAllreviews(){
    return this.http.get<CarReview[]>(`${this.user_api}/getAllReviews`,{withCredentials:true})
  }
  getSingleReview(reviewId:any){
    return this.http.get(`${this.user_api}/getSingleReview/${reviewId}`,{withCredentials:true})
  }
  getCarsOfBrand(brandId:string|null): Observable<any>{
    if(brandId == null){
      return new Observable<any>();
    }
    return this.http.get(`${this.user_api}/getCarsOfBrand/${brandId}`,{withCredentials:true})
  }
  addWishlist(data:string): Observable<any>{
    console.log(data,"form");
    
    return this.http.post<addWishlistApi>(`${this.user_api}/addToWishlist/${data}`,{withCredentials:true})
  }
  getWishlist(){
    return this.http.get(`${this.user_api}/getWishlist`,{withCredentials:true})
  }
  getChattingReviewer(connectioId:string){
    return this.http.get(`${this.user_api}/getChattingReviewer/${connectioId}`,{withCredentials:true})
  }
  sendMessage(reviewerId:String,form:FormData){   
    return this.http.post(`${this.user_api}/sendMessage/${reviewerId}`,form,{withCredentials:true})
  }
  getMessages(connectionId:String){
    return this.http.get(`${this.user_api}/getMessages/${connectionId}`,{withCredentials:true})
  }
  getAllCars(){
    return this.http.get<CarBrand[]>(`${this.user_api}/getAllCars`,{withCredentials:true})
  }
  // getCarsPage(filter:any){
  //   const params = new HttpParams({ fromObject: filter });
  //   return this.http.get<any>(`${this.user_api}/getCars`,{params})
  // }
  getUserId(){
    return this.http.get<userIdRes>(`${this.user_api}/getUserId`,{withCredentials:true})
  }
  getTaxData(_id:string){
    console.log(_id,"in service taxid");
    
    return this.http.get<SingleTaxData>(`${this.user_api}/getTaxData/${_id}`,{withCredentials:true})
  }
  getFilterData(){
    return this.http.get<getfilterDataRes>(`${this.user_api}/getfilterData`,{withCredentials:true})
  }
  // Angular service method
// getFilteredCars(filters: any): Observable<any> {
//   const params = new HttpParams({ fromObject: filters });
//   return this.http.get<any>(`${this.user_api}/carFilter`, { params });
// }
getFilteredCars(filters: any): Observable<any> {
  const queryParams = this.serializeQueryParams(filters); // Create a function to serialize query parameters
  const url = `${this.user_api}/carFilter?${queryParams}`;
  return this.http.get<carModel[]>(url);
}

private serializeQueryParams(params: any): string {
  return Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}
getOtherBrands(brandId:string){
  return this.http.get(`${this.user_api}/getOtherBrands/${brandId}`,{withCredentials:true})
}
getComapreBrands(){
  return this.http.get(`${this.user_api}/getUniqueBrandsforCompare`,{withCredentials:true})
}
getComapreCars(brandId:string){
  return this.http.get(`${this.user_api}/getUniqueCarsforCompare/${brandId}`,{withCredentials:true})
}
getComapreVersions(carId:string){
  return this.http.get(`${this.user_api}/getVersionsforCompare/${carId}`,{withCredentials:true})
}
loadimage(image:string){
  return (`${this.user_api}/public/brandImages/${image}`)
}

}
