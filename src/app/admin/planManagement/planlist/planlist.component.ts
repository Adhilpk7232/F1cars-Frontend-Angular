import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Emitters } from 'src/app/emitters/emitter';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
@Component({
  selector: 'app-planlist',
  templateUrl: './planlist.component.html',
  styleUrls: ['./planlist.component.css']
})
export class PlanlistComponent implements OnInit{

  planPackage:any[]=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
   constructor(private http:HttpClient,private router:Router , private adminApi:AdminServiceService) {
    
   }
   ngOnInit(): void {
     
     
     this.http.get('http://localhost:5000/admin/active',{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
      //  this.getcar()
       Emitters.authEmiter.emit(true)
     },(err)=>{
     this.router.navigate(['/admin']);
     Emitters.authEmiter.emit(false)
     })
     this.getPlan()
   }
 
   getPlan(){
    this.adminApi.getPlanPackage().subscribe((res:any)=>{
      this.planPackage = res
    })
     
   }
 
   deleteBrand(planId: any){
     console.log(planId+"toDeeeeeeeeeeeeeeeeee");
     this.http.get(`http://localhost:5000/admin/deletePlan/${planId}`,{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.planPackage=response
       Emitters.authEmiter.emit(true)
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");
     this.router.navigate(['/admin/adminHome']);
     Emitters.authEmiter.emit(false)
     })
   }
 
   editBrand(carId:any){
     console.log(carId,'car isd');
     
       this.router.navigate(['/admin/updatePlan',carId])
   }
   unListBrand(userId:any){
     this.http.post(`http://localhost:5000/admin/blockUser/${userId}`,{
       withCredentials:true
     }).subscribe((response:any)=>{
       console.log(response);
       this.planPackage=response
       Emitters.authEmiter.emit(true)
     },(err)=>{
       console.log(err+"jjjjjjjj");
       this.router.navigate(['/admin']);
       Emitters.authEmiter.emit(false)
     })
   }
 
   addPlan(){
    this.router.navigate(['/admin/createPlan'])
   }
 
   onTableDataChange(event:any){
    this.page=event
    this.getPlan()
  }
  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1
    this.getPlan()
  }
 
 
}
