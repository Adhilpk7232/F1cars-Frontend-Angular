import { Component } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-forget-email',
  templateUrl: './forget-email.component.html',
  styleUrls: ['./forget-email.component.css']
})
export class ForgetEmailComponent {

  form!:FormGroup;
  login=false
  message=''
  email: string = '';
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router , private userService:UserServiceService){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      
    })
  }
  
  get f (){
    return this.form.controls;
  }
  submit():void{
    
    
    this.login=true
    let user =this.form.getRawValue()
    console.log(user);
    this.email=user.email
    console.log(this.email);
      this.userService.forgetPasswordUserFind(user).subscribe((res:any)=> {
        console.log(res)
        this.router.navigate(['/forgetOTP'], { queryParams: { email: this.email } })
      }
      ,(err)=>{
        this.message=err.error.message
      })
  }
}
