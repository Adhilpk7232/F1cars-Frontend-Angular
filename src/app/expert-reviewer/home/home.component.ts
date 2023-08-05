import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private http:HttpClient ,private router:Router){}
  ngOnInit(): void {
    this.http.get('http://localhost:5000/reviewer/active',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/reviewer']);
    Emitters.authEmiter.emit(false)
    })
  }

}
