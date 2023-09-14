import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-brand-list',
  templateUrl: './admin-brand-list.component.html',
  styleUrls: ['./admin-brand-list.component.css']
})
export class AdminBrandListComponent implements OnInit {

 
  myData: any = 'Hello, World!';
 brand:any=[]
 page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,
    private adminApi:AdminServiceService
    ){}
  ngOnInit(): void {
      this.getbrand()
  }

  getbrand(){

    this.adminApi.getbrand().subscribe((response:any)=>{
      console.log(response);
      this.brand=response

    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    })
  }

  deleteBrand(brandId: any){

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
    this.adminApi.deleteBrand(brandId).subscribe((response:any)=>{
      console.log(response);
      this.brand=response
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

  editBrand(brandId:string){
      this.router.navigate(['/admin/adminEditBrand',brandId])
  }
  unListBrand(brandId:string){
    this.adminApi.unListBrand(brandId).subscribe((response:any)=>{
      console.log(response);
      this.brand=response
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"jjjjjjjj");
      this.router.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
    })
  }

  createUser(){
    this.router.navigate(['admin/createuser'])
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
      return this.adminApi.loadimage(image);
    }else {
      return null
    }
  }


}
