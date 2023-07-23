import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormBuilder,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }
  validateEmail=(email:any)=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)){
    return true;
  
    }else{
    return false;
    }
  }
  submit():void{
    let user =this.form.getRawValue()
  console.log(user);
     if(user.email==""||user.password==""){
      Swal.fire('Error',"please enter all fields","error")
     }else if(!this.validateEmail(user.email)){
      Swal.fire('Error',"please enter valid email","error")
     }else{
      this.http.post('http://localhost:5000/login',user,{
        withCredentials: true
      }).subscribe(()=> this.router.navigate(['/']),(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }

}