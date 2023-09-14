import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  // form!:FormGroup
constructor(private formBuilder:FormBuilder,private userService:UserServiceService,
  private router:Router,
  private loaderService:LoaderserviceService
  ){}
 
  form!:FormGroup;
  register = false;
  message='';
  states:any;
  userEmail!:string;
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    this.getStates()
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]],
      state:['',Validators.required]
    });
  }
  getStates(){
    this.userService.getStates().subscribe((res:any) => {
      this.states = res.StatesData
    },(err)=>{
      console.log(err.error.message);
      
    })
  }


get f (){
  return this.form.controls;
}


submit():void{
  
  this.register = true
  if(this.form.valid){
    let user =this.form.getRawValue()
    this.userEmail = user.email
    const encodedEmail = encodeURIComponent(this.userEmail);
    this.userService.userRegister(user).subscribe((res:any)=>{ 
      // this.userService.saveToken(res.token);
      const queryParams = { email: encodedEmail };
      this.router.navigate(['/otp'],{queryParams})
    },(err)=>{
      this.message = err.error.message
    })

  }
  

}

}
