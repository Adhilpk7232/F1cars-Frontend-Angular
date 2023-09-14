import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { AdminloginRes } from 'src/app/models/adminLoginRes';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  form!:FormGroup
  message=''
  login=false
  adminEmail!:string;
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

  submit(): void {

    console.log("clicked");

    this.login = true;
    if(this.form.valid){
      let user = this.form.getRawValue();
      this.adminEmail = user.email
      const encodedEmail = encodeURIComponent(this.adminEmail);
      console.log(encodedEmail,"in login form");
      
    this.adminService.adminLogin(user).subscribe(
      (res: AdminloginRes) => {
        // Navigate to the adminHome route on successful login
        console.log("fine");
        // this.adminService.saveToken(res.token);
        const queryParams = { email: encodedEmail };
      this.router.navigate(['/admin/adminOtp'], { queryParams });
        // this.router.navigate([`/admin/adminOtp/${encodedEmail}`])
      },
      (err) => {
        // Handle the error response from the API
        console.log(err,"error");
        
        this.message = err.error.message;
      }
    );
    }

    
  }
  
}
