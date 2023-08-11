import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit{

  
  myData: any = 'Hello, World!';
  users:any=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router ,private adminService:AdminServiceService){}
  ngOnInit(): void {
    
    
    // this.http.get('http://localhost:5000/admin/active',{
    //   withCredentials:true
    // })
    this.adminService.active().subscribe((response:any)=>{
      console.log(response);
      this.getusers()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
    this.getusers()
  }

  getusers(){
    // this.http.get('http://localhost:5000/admin/users',{
    //   withCredentials:true
    // })
    this.adminService.getusers().subscribe((response:any)=>{
      console.log(response);
      this.users=response
      this.count = this.users.length;
      console.log(this.count);
      
      console.log(this.users+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  deleteUser(userId: any){
    console.log(userId+"toDeeeeeeeeeeeeeeeeee");
    this.http.post(`http://localhost:5000/admin/deleteUser/${userId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.users=response
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  editUser(userId:any){
      this.router.navigate(['/admin/editUser/',userId])
  }
  blockUser(userId:any){
    this.http.post(`http://localhost:5000/admin/blockUser/${userId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.users=response
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
    this.getusers()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getusers()
  }

 }

