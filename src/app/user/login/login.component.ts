import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormBuilder,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!:FormGroup;
  login=false
  message=''
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router , private userService:UserServiceService){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]]
    })
  }
  
  get f (){
    return this.form.controls;
  }
  submit():void{
    this.login=true
    let user =this.form.getRawValue()
  console.log(user);
      this.userService.userLogin(user).subscribe((res:any)=> {
        if(res.isVerified === 0){
          this.router.navigate(['/otp'])
        }else{
          this.router.navigate(['/'])}
        }
        ,(err)=>{
        this.message=err.error.message
      })
    //  }
  }

}
