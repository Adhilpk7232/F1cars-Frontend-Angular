import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {

  reviews :any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  constructor(private toastr: ToastrService,private http:HttpClient, private router:Router,private reviewerApi:ReviewerServiceService){}
  ngOnInit(): void {
    this.reviewerApi.isActive().subscribe((response:any)=>{
      console.log(response);
      this.getReviewes()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }
  getReviewes(){
    this.reviewerApi.getCarReviews().subscribe((response:any)=>{
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
  
  // edit(reviewId:String){
  //   console.log("hello");
    
  //   console.log(reviewId,"clicked");
    
  //   this.router.navigate(['/reviewer/carReviewUpdate',reviewId])
  // }
  edit(reviewId:String){
    console.log(reviewId,"clicked");
    this.router.navigate(['/reviewer/carReviewUpdate',reviewId])
  }
  preview(reviewId:String){
    console.log(reviewId,"clicked");
    this.router.navigate(['/reviewer/carReviewPreview',reviewId])

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
  getImageUrl(image: string) {
    if(image){
      return this.reviewerApi.loadimage(image);
    }else {
      return null
    }
  }
}
