import { Component,OnInit } from '@angular/core';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review-brand-show',
  templateUrl: './review-brand-show.component.html',
  styleUrls: ['./review-brand-show.component.css']
})
export class ReviewBrandShowComponent implements OnInit{

  brand:any=[]

  constructor(private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    
    
    this.http.get('http://localhost:5000/reviewer/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getbrand()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }

  getbrand(){
    this.http.get('http://localhost:5000/reviewer/brand',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.brand=response
      
      console.log(this.brand+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }
  addReview(BrandId:string){
    console.log(BrandId,"llllllllllllllllll");
    this.router.navigate(['/reviewer/reviewerAddReviewCar/',BrandId])
    

  }
}
