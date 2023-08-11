import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {

  reviews :any=[]
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.http.get('http://localhost:5000/reviewer/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getReviewes()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }
  getReviewes(){
    this.http.get('http://localhost:5000/reviewer/carReview',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.reviews=response
      
      console.log(this.reviews+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }
  unlistReview(id:any){
    console.log(id,"lljscnjn");
    
  }
  unListReview(reviewId:any){
    // this.http.post(`http://localhost:5000/reviewer/unlistReview/${reviewId}`,{
    //   withCredentials:true
    // }).subscribe((response:any)=>{
    //   console.log(response);
    //   this.reviews=response
    //   Emitters.authEmiter.emit(true)
    // },(err)=>{
    //   console.log(err+"jjjjjjjj");
    //   this.router.navigate(['/reviewer']);
    //   Emitters.authEmiter.emit(false)
    // })
  }
}
