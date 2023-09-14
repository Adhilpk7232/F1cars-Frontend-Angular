import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormBuilder,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!:FormGroup;
  login=false
  message='';
  loader:boolean=false;
  userId!:string

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router , 
    private userService:UserServiceService,
    private toastr:ToastrService,
    private loaderService:LoaderserviceService
    ){}
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]]
    })
  }
  
  get f (){
    return this.form.controls;
  }
  submit():void{
    this.loader = true
    this.login=true
    let user =this.form.getRawValue()
  console.log(user);
      this.userService.userLogin(user).subscribe((res:any)=> {
        this.loader = false
        console.log("hello",res.isVerified);
        if(res.isVerified === 0){
          
          
          this.userId = res.userEmail
          const encodedEmail = encodeURIComponent(this.userId);
          const queryParams = { email: encodedEmail };
          this.router.navigate(['/otp'],{queryParams})
        }else{
          this.userService.saveToken(res.token);
          this.toastr.success('Login successfully!', 'Success');
          this.router.navigate(['/'])}
        }
        ,(err)=>{
          this.loader = false
        this.message=err.error.message
      })
    //  }
  }

}
