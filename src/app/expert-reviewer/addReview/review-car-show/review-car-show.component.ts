import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';

@Component({
  selector: 'app-review-car-show',
  templateUrl: './review-car-show.component.html',
  styleUrls: ['./review-car-show.component.css']
})
export class ReviewCarShowComponent implements OnInit{

  brandId!:any;
  cars:any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]

  constructor(private http:HttpClient, private router:ActivatedRoute,private route:Router,
    private reviewerApi:ReviewerServiceService){}
  ngOnInit(): void {
    this.brandId = this.router.snapshot.paramMap.get('brandId');

      this.getCars(this.brandId)

  }
 
  getCars(BrandId:any){
    this.reviewerApi.getCars(BrandId).subscribe((response:any)=>{
      console.log(response);
      this.cars=response
      this.count = this.cars.length;

    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");

    })
  }
  addReview(carId:string){
    this.route.navigate(['/reviewer/reviewerAddReviewForm/',carId])
  }
  onTableDataChange(event:any){
    this.page=event
    this.getCars(this.brandId)
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getCars(this.brandId)
  }
  getImageUrl(image: string) {
    if(image){
      return this.reviewerApi.loadimage(image);
    }else {
      return null
    }
  }
}
