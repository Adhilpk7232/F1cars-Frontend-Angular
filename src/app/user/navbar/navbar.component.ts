import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userApi:UserServiceService, private router:Router){}

  logout(){
    this.userApi.logout().subscribe((res:any)=> this.router.navigate(['/']),(err)=>{
      console.log(err.error.message,"error")
    })
  }

}
