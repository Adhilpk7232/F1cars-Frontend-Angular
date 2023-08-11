import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  form!:FormGroup
  message=''
  login=false
  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private router:Router,private adminService:AdminServiceService){}
   
   ngOnInit(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]]
    })
   }
   
   get f (){
    return this.form.controls;
  }
  // submit():void{
  //   console.log("clicked");
    
  //   this.login=true
  //   let user =this.form.getRawValue()
  // console.log(user);
     
  //     // this.http.post('http://localhost:5000/admin/login',user,{
  //     //   withCredentials: true
  //     // })
  //     this.adminService.adminLogin(user).subscribe((res:any)=> this.router.navigate(['/adminHome']),(err)=>{
  //       this.message=err.error.message
  //     })
     
  // }
  submit(): void {

    console.log("clicked");

    this.login = true;

    let user = this.form.getRawValue();

    this.adminService.adminLogin(user).subscribe(
      (res: any) => {
        // Navigate to the adminHome route on successful login
        console.log("fine");
        
        this.router.navigate(['/admin/adminHome'])
      },
      (err) => {
        // Handle the error response from the API
        console.log(err,"error");
        
        this.message = err.error.message;
      }
    );
  }
  
}
