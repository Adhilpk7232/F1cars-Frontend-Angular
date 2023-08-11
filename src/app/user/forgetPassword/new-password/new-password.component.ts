import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormBuilder,AbstractControl  } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{
  // form!:FormGroup
  constructor(private formBuilder:FormBuilder,private userService:UserServiceService,
    private router:Router,
    private route:ActivatedRoute){}
   
    form!:FormGroup;
    register = false
    message=''
    email:string='';
    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.email = params['email'];
      });
      this.form = this.formBuilder.group({
        
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]],
        confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    }
    passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { 'passwordMismatch': true };
    }
  
  
  get f (){
    return this.form.controls;
  }
  
  
  submit():void{
    console.log('clicked');
    console.log('f',this.f);
    
    this.register = true
    let user =this.form.getRawValue()
  console.log(user);
    
      // this.http.post('http://localhost:5000/register',user,{
      //   withCredentials: true
      // })
      this.userService.resetPassword(user,this.email).subscribe((res:any)=>{ this.router.navigate(['/login'])},(err)=>{
        Swal.fire('Error',err.error.message,"error")
        this.message = err.error.message
      })
  
  }
}
