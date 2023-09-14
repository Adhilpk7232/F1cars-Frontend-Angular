import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/apiResponse';
import { AdminloginRes } from 'src/app/models/adminLoginRes';
import { UserModel } from 'src/app/models/userModel';
import { blockUserRes } from 'src/app/models/blockuserRes';
import { environmet } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }

  admin_api = `${environmet.api}/admin`;

  loadimage(image:string){
    return (`${environmet.api}/public/brandImages/${image}`)
  }
  
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
    return this.http.post<AdminloginRes>(`${this.admin_api}/login`, data,{ withCredentials: true });
  }
  active(){
    return this.http.get<ApiResponse>(`${this.admin_api}/active`,{ withCredentials: true });
  }
  getusers(){
    return this.http.get<UserModel[]>(`${this.admin_api}/users`,{ withCredentials: true });
  }
  resendOtp(email:string){
    console.log("hello");
    
    return this.http.get<any>(`${this.admin_api}/otpResend/${email}`,{ withCredentials: true });
  }
  verifyotp(otp:any,email:string){
    return this.http.post(`${this.admin_api}/otpVerify/${email}`,otp,{ withCredentials: true })
  }
  logout(){
    return this.http.get<ApiResponse>(`${this.admin_api}/logout`,{ withCredentials: true });
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
  // deleteCar(carId:String){
  //   return this.http.get(`${this.admin_api}/getPlans/${carId}`,{ withCredentials: true })
  // }
  getPlandetailsForUpdate(planId:any){
    return this.http.get(`${this.admin_api}/getPlanData/${planId}`,{ withCredentials: true })
  }
  getTaxDetails(){
    return this.http.get(`${this.admin_api}/getAllTax`,{ withCredentials: true })
  }
  
  addTaxDetails(data:FormData): Observable<any>{
    console.log(data);
    
    return this.http.post(`${this.admin_api}/addtax`, data,{ withCredentials: true });
  }
  deleteTax(taxId:string){
    return this.http.get(`${this.admin_api}/deleteTax/${taxId}`,{ withCredentials: true })
  }
  getVersions(CarId:string){
    return this.http.get(`${this.admin_api}/getAllVersions/${CarId}`,{ withCredentials: true })
  }
  imageUpload(data:FormData) { 
    return this.http.post(`${this.admin_api}/upload`, data,{ withCredentials: true });
  }
  getCarDetails(CarId:string){
    return this.http.post(`${this.admin_api}/editCarDetails/${CarId}`,{ withCredentials: true })
  }
  addVersion(CarId:string,data:FormData){
    return this.http.post(`${this.admin_api}/addVersion/${CarId}`,data,{ withCredentials: true })
  }
  getReviewerData(reviewerId:string){
    return this.http.get(`${this.admin_api}/editReviewerDetails/${reviewerId}`,{ withCredentials: true })
  }
  postEditDealer(DealerId: string, data: FormData): Observable<any>{
    return this.http.post(`${this.admin_api}/editDealer/${DealerId}`, data, { withCredentials: true });
  }
  postEditReviewer(reviewerId: string, data: FormData): Observable<any>{
    return this.http.post(`${this.admin_api}/editReviewer/${reviewerId}`, data, { withCredentials: true });
  }
  AddBrand(formData:any): Observable<any>{
    return this.http.post(`${this.admin_api}/createBrand`, formData, { withCredentials: true });
  }
  getBrands(brandId:string){
    return this.http.post(`${this.admin_api}/getBrandDetails/${brandId}`,{withCredentials:true});
  }
  editbrand(brandId:string,formData:FormData){
    return this.http.post(`${this.admin_api}/editBrand/${brandId}`,formData,{withCredentials:true});
  }
  editTax(TaxId:string,formData:FormData){
    return this.http.post(`${this.admin_api}/editTax/${TaxId}`,formData,{withCredentials:true});
  }
  getTaxInfo(taxId:string){
    return this.http.get(`${this.admin_api}/TaxInfo/${taxId}`,{withCredentials:true});
  }
  blockUser(userId:string){
    return this.http.post<blockUserRes>(`${this.admin_api}/blockUser/${userId}`,{
      withCredentials:true
    })
  }
  userEdit(userId:string,formdata:FormData){
    return this.http.post(`${this.admin_api}/editUser/${userId}`,formdata,{
      withCredentials: true
    })
  }
  getUserInfo(userId:string){
    return this.http.post<UserModel>(`${this.admin_api}/editUserDetails/${userId}`,{
      withCredentials:true
    })
  }
  getAllReviewers(){
    return this.http.get(`${this.admin_api}/reviewer`,{ withCredentials:true})
  }
  deleteReviewer(reviewerId:string){
    return this.http.post(`${this.admin_api}/deleteReviewer/${reviewerId}`,{withCredentials:true})
  }
  addReviewer(form:FormData){
    return this.http.post(`${this.admin_api}/createReviewer`,form,{
      withCredentials: true
    })
  }
  getbrand(){
    return this.http.get(`${this.admin_api}/brand`,{     withCredentials:true    })
  }
  deleteBrand(brandId:string){
    return this.http.post(`${this.admin_api}/deleteBrand/${brandId}`,{
      withCredentials:true
    })
  }
  

  getAllBrands(){
    return this.http.get(`${this.admin_api}/brand`,{
      withCredentials:true
    })
  }
  addCar(form:any){
    return this.http.post(`${this.admin_api}/addCar`,form,{
        withCredentials: true
      })
  }
  updateCar(carId:string,carData:any){
    return this.http.post(`${this.admin_api}/updateCar/${carId}`,carData,{
      withCredentials: true
    })
  }
  getcar(){
    return this.http.get(`${this.admin_api}/car`,{
      withCredentials:true
    })
  }
  deleteCar(carId:string){
    return this.http.get(`${this.admin_api}/deleteCar/${carId}`,{
      withCredentials:true
    })
  }
  unListBrand(brandId:string){
    return this.http.get(`${this.admin_api}/unlistBrand/${brandId}`,{
      withCredentials:true
    })
  }
  getAllCarReviewes(){
    return this.http.get(`${this.admin_api}/carReview`,{
      withCredentials:true
    })
  }
  unListReview(reviewId:string){
    return this.http.post(`${this.admin_api}/unlistReview/${reviewId}`,{
      withCredentials:true
    })
  }
  addPlan(planData:FormData){
    return this.http.post(`${this.admin_api}/createPlan`,planData,{
      withCredentials: true
    })
  }
  updatePlan(planId:string,planData:FormData){
    return this.http.post(`${this.admin_api}/updatePlan/${planId}`,planData,{
      withCredentials: true
    })
  }
  deletePlan(planId: any){
    return this.http.get(`${this.admin_api}/deletePlan/${planId}`,{
      withCredentials:true
    })
  }
  unListPlan(planId:string){
    return this.http.get(`${this.admin_api}/unlistPlan/${planId}`,{
      withCredentials:true
    })
  }
}
