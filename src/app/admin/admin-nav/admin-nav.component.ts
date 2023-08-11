import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{
  constructor(private adminApi:AdminServiceService ,private router:Router){}
  ngOnInit(): void {
    
  }
  logout(){
    this.adminApi.logout().subscribe((res:any)=>{
      this.adminApi.removeToken()
      this.router.navigate(['/admin'])},(err)=>{
      console.log(err.error.message);
      
    })
  }

}
