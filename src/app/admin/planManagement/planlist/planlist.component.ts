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
     
     this.getPlan()
   }
 
   getPlan(){
    this.adminApi.getPlanPackage().subscribe((res:any)=>{
      this.planPackage = res
    })
     
   }
 
   deletePlan(planId: string){
    this.adminApi.deletePlan(planId).subscribe((response:any)=>{
       console.log(response);
       this.planPackage=response
       Emitters.authEmiter.emit(true)
     },(err)=>{
       console.log(err+"hhhhhhhhhhhhhhhhhhh");
     this.router.navigate(['/admin/adminHome']);
     Emitters.authEmiter.emit(false)
     })
   }
 
   editPlan(carId:any){
     console.log(carId,'car isd');
     
       this.router.navigate(['/admin/updatePlan',carId])
   }
   UnlistPlan(plandId:string){
     this.adminApi.unListPlan(plandId).subscribe((response:any)=>{
       console.log(response);
       this.planPackage=response
     },(err)=>{
       console.log(err+"jjjjjjjj");

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
