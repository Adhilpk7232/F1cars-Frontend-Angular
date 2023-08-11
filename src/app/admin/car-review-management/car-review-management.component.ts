import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Emitters } from 'src/app/emitters/emitter';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-review-management',
  templateUrl: './car-review-management.component.html',
  styleUrls: ['./car-review-management.component.css']
})
export class CarReviewManagementComponent implements OnInit{

  reviews :any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.http.get('http://localhost:5000/admin/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getReviewes()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }
  getReviewes(){
    this.http.get('http://localhost:5000/admin/carReview',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.reviews=response
      
      console.log(this.reviews+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/']);
    Emitters.authEmiter.emit(false)
    })
  }
  unlistReview(id:any){
    console.log(id,"lljscnjn");
    
  }
  unListReview(reviewId:any){
    this.http.post(`http://localhost:5000/admin/unlistReview/${reviewId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.reviews=response
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"jjjjjjjj");
      this.router.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
    })
  }
  onTableDataChange(event:any){
    this.page=event
    this.getReviewes()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getReviewes()
  }
}
