import { Component,OnInit } from '@angular/core';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';

@Component({
  selector: 'app-review-brand-show',
  templateUrl: './review-brand-show.component.html',
  styleUrls: ['./review-brand-show.component.css']
})
export class ReviewBrandShowComponent implements OnInit{

  brand:any[]=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]

  constructor(private http:HttpClient,private router:Router,
    private reviewerApi:ReviewerServiceService){}
  ngOnInit(): void {
    this.getbrand()
  }

  getbrand(){
    this.reviewerApi.getbrand().subscribe((response:any)=>{
      console.log(response);
      this.brand=response
      this.count = this.brand.length;

    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    })
  }
  addReview(BrandId:string){
    this.router.navigate(['/reviewer/reviewerAddReviewCar/',BrandId])
  }
  onTableDataChange(event:any){
    this.page=event
    this.getbrand()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getbrand()
  }
  getImageUrl(image: string) {
    if(image){
      return this.reviewerApi.loadimage(image);
    }else {
      return null
    }
  }
}
