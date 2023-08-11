import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css']
})
export class AdminCarListComponent implements OnInit {
  myData: any = 'Hello, World!';
  car:any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
   constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router ,private adminApi:AdminServiceService){}
   ngOnInit(): void {
     
     
     this.http.get('http://localhost:5000/admin/active',{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.getcar()
       Emitters.authEmiter.emit(true)
     },(err)=>{
     this.router.navigate(['/admin']);
     Emitters.authEmiter.emit(false)
     })
   }
 
   getcar(){
     this.http.get('http://localhost:5000/admin/car',{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.car=response
       
       console.log(this.car+"qqqqqqqqqqqqqqqq");
       
       Emitters.authEmiter.emit(true)
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");
     this.router.navigate(['/admin']);
     Emitters.authEmiter.emit(false)
     })
   }
 
   deleteBrand(CarId: any){

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
     this.http.get(`http://localhost:5000/admin/deleteCar/${CarId}`,{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.car=response
       Emitters.authEmiter.emit(true)
       Swal.fire(
        'Deleted!',
        'Your data has been deleted.',
        'success'
      );
       this.router.navigate(['/admin/adminCar'])
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");
     
     Emitters.authEmiter.emit(false)
     })
        
      }
    });


     
   }
 
   editBrand(carId:any){
     console.log(carId,'car isd');
     
       this.router.navigate(['/admin/adminEditcar',carId])
   }
   unListBrand(userId:any){
     this.http.post(`http://localhost:5000/admin/blockUser/${userId}`,{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.car=response
       Emitters.authEmiter.emit(true)
     },(err)=>{
       console.log(err+"jjjjjjjj");
       this.router.navigate(['/admin']);
       Emitters.authEmiter.emit(false)
     })
   }
 
   AddCars(){
 
     
     this.router.navigate(['adminAddCar'])
   }
 
   onTableDataChange(event:any){
    this.page=event
    this.getcar()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getcar()
  }
 
 

}
