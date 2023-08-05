import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-review-car-show',
  templateUrl: './review-car-show.component.html',
  styleUrls: ['./review-car-show.component.css']
})
export class ReviewCarShowComponent implements OnInit{

  brandId!:any;
  cars:any=[]
  constructor(private http:HttpClient, private router:ActivatedRoute,private route:Router){}
  ngOnInit(): void {
    this.brandId = this.router.snapshot.paramMap.get('brandId');
    this.http.get('http://localhost:5000/reviewer/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getCars(this.brandId)
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.route.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }
 
  getCars(BrandId:any){
    this.http.get(`http://localhost:5000/reviewer/cars/${BrandId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.cars=response
      
      console.log(this.cars+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.route.navigate(['/reviewer/reviewerHome']);
    Emitters.authEmiter.emit(false)
    })
  }
  addReview(carId:string){
    console.log(typeof carId,"llllllllllllllllll");
    this.route.navigate(['/reviewer/reviewerAddReviewForm/',carId])
  }

}
