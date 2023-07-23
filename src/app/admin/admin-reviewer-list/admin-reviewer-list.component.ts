import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../../emitters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reviewer-list',
  templateUrl: './admin-reviewer-list.component.html',
  styleUrls: ['./admin-reviewer-list.component.css']
})
export class AdminReviewerListComponent implements OnInit{

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
     this.http.get('http://localhost:5000/admin/reviewer',{
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
 
   deleteReviewer(userId: any){
     console.log(userId+"toDeeeeeeeeeeeeeeeeee");
     this.http.post(`http://localhost:5000/admin/deleteReviewer/${userId}`,{
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
 
   editReviewer(userId:any){
       this.router.navigate(['/admin/editReviwerDetails',userId])
   }
 
   createReviwer(){
     this.router.navigate(['admin/createReviewer'])
   }

}