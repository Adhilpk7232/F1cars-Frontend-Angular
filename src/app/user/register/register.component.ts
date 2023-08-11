import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  // form!:FormGroup
constructor(private formBuilder:FormBuilder,private userService:UserServiceService,
  private router:Router){}
 
  form!:FormGroup;
  register = false
  message=''
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]]
    });
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
    this.userService.userRegister(user).subscribe((res:any)=>{ 
      this.userService.saveToken(res.token);
      this.router.navigate(['/otp'])},(err)=>{
      Swal.fire('Error',err.error.message,"error")
      this.message = err.error.message
    })

}
}
