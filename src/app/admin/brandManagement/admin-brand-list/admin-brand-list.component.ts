import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';

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
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    
    
    this.http.get('http://localhost:5000/admin/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getbrand()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  getbrand(){
    this.http.get('http://localhost:5000/admin/brand',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.brand=response
      
      console.log(this.brand+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  deleteBrand(userId: any){
    console.log(userId+"toDeeeeeeeeeeeeeeeeee");
    this.http.post(`http://localhost:5000/admin/deleteBrand/${userId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.brand=response
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  editBrand(brandId:any){
      this.router.navigate(['/admin/adminEditBrand',brandId])
  }
  unListBrand(userId:any){
    this.http.post(`http://localhost:5000/admin/blockUser/${userId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
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



}
