import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../emitters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dealer-list',
  templateUrl: './admin-dealer-list.component.html',
  styleUrls: ['./admin-dealer-list.component.css']
})
export class AdminDealerListComponent implements OnInit{
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
     this.http.get('http://localhost:5000/admin/dealer',{
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
 
   deleteDealer(userId: any){
     console.log(userId+"toDeeeeeeeeeeeeeeeeee");
     this.http.post(`http://localhost:5000/admin/deleteDealer/${userId}`,{
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
 
   editDealer(userId:any){
       this.router.navigate(['/admin/editDealerDetails',userId])
   }
 
   createUser(){
     this.router.navigate(['admin/createDealer'])
   }
}