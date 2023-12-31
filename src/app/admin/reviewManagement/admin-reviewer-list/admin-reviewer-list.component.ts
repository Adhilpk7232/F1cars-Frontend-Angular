import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-reviewer-list',
  templateUrl: './admin-reviewer-list.component.html',
  styleUrls: ['./admin-reviewer-list.component.css']
})
export class AdminReviewerListComponent implements OnInit {

  myData: any = 'Hello, World!';
  users:any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
   constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private adminApi:AdminServiceService
    ){}
   ngOnInit(): void {
       this.getReviewers()
   }
 
   getReviewers(){
     this.adminApi.getAllReviewers().subscribe((response:any)=>{
       console.log(response);
       this.users=response
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");

     })
   }
 
   deleteReviewer(userId: any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(userId+"toDeeeeeeeeeeeeeeeeee");
     this.adminApi.deleteReviewer(userId).subscribe((response:any)=>{
       console.log(response);
       this.users=response
       
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");
     })
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        );
      }
    });
  }
   editReviewer(userId:any){
       this.router.navigate(['/admin/editReviewer',userId])
   }
 
   createReviwer(){
     this.router.navigate(['admin/createReviewer'])
   }
   onTableDataChange(event:any){
    this.page=event
    this.getReviewers()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getReviewers()
  }

}
