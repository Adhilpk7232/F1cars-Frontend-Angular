import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Emitters } from 'src/app/emitters/emitter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';


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
  constructor(
    private router:Router,
    private adminApi:AdminServiceService
    ){}
  ngOnInit(): void {

      this.getReviewes()

  }
  getReviewes(){
    this.adminApi.getAllCarReviewes().subscribe((response:any)=>{
      console.log(response);
      this.reviews=response

    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    })
  }

  unListReview(reviewId:string){
    this.adminApi.unListReview(reviewId).subscribe((response:any)=>{
      console.log(response);
      this.reviews=response
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      });
    },(err)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Your work has been saved',
        showConfirmButton: true,
        timer: 1500
      });
      this.router.navigate(['/admin']);
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
  getImageUrl(image: string) {
    if(image){
      return this.adminApi.loadimage(image);
    }else {
      return null
    }
  }
}
