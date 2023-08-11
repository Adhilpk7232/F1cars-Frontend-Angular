import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private reviewerApi:ReviewerServiceService
    ){}
   
   ngOnInit(){
    this.form = this.formBuilder.group({
     
      email:'',
      password:''
    })
   }
  
  
  submit():void{
    let user =this.form.getRawValue()
  console.log(user);
     if(user.email==""||user.password==""){
      Swal.fire('Error',"please enter all fields","error")
     }else{
      this.http.post('http://localhost:5000/reviewer/login',user,{
        withCredentials: true
      }).subscribe((res:any)=>{
        this.reviewerApi.saveToken(res.token)
       this.router.navigate(['/reviewer/reviewerHome'])},(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }
}
