import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private http:HttpClient,private route:Router , private reviewerApi:ReviewerServiceService){}
  ngOnInit(): void {
    
  }

  logout(){

    this.http.post('http://localhost:5000/reviewer/logout',{
      withCredential:true
    }).subscribe((res)=>{
      console.log(res);
      this.reviewerApi.removeToken()
      this.route.navigate(['/reviewer'])
      
    },(err)=>{
      console.log(err,"error in the logout button");
      
      
    })
  }
}
