import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { Emitters } from 'src/app/emitters/emitter';
import { ApiResponse } from 'src/app/models/apiResponse';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  constructor(
    private adminApi:AdminServiceService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.adminApi.active().subscribe((res:ApiResponse)=>{
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err);
      this.router.navigate(['/admin'])
      
    })
  }

}
