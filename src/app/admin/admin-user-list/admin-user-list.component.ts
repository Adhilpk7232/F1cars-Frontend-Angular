import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../emitters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit{

  myData: any = 'Hello, World!';
 users:any=[]
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    
    
    this.http.get('http://localhost:5000/admin/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.getusers()
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }

  getusers(){
    this.http.get('http://localhost:5000/admin/users',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.users=response
      
      console.log(this.users+"qqqqqqqqqqqqqqqq");
      
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.router.navigate(['/']);
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
      this.router.navigate(['/admin/editUser',userId])
  }

  createUser(){
    this.router.navigate(['admin/createuser'])
  }
}
