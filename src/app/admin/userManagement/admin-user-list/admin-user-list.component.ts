import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../../emitters/emitter';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/apiResponse';
import { UserModel } from 'src/app/models/userModel';
import { blockUserRes } from 'src/app/models/blockuserRes';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit{

  
  myData: string = 'Hello, World!';
  users:UserModel[]=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  constructor(private toaster: ToastrService,private formBuilder:FormBuilder,private http:HttpClient,private router:Router ,
    private adminService:AdminServiceService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.getusers()
  }

  getusers(){

    this.adminService.getusers().subscribe((response:UserModel[])=>{
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

  

  editUser(userId:String){
      this.router.navigate(['/admin/editUser/',userId])
  }
  blockUser(userId:string){
    
    this.adminService.blockUser(userId).subscribe((response:blockUserRes)=>{
      console.log(response);
      this.users=response.user

      this.toastr.success(response.message,'Successfully', { progressBar: true });
    },(err)=>{
      this.toastr.error(err.error.message ,'', {progressBar: true})
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

