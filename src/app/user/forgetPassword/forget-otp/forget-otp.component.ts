import { Component, OnInit, Input } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import{FormGroup,FormBuilder ,Validators} from '@angular/forms'
import Swal from 'sweetalert2';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-forget-otp',
  templateUrl: './forget-otp.component.html',
  styleUrls: ['./forget-otp.component.css']
})
export class ForgetOtpComponent implements OnInit {

  form!:FormGroup;
  // userId:string|null;
  timer: number = 60; 
  timerRunning: boolean = false;
  otpEntered = false
  message!:string;
  countDown!: Subscription;
  counter = 10;
  tick = 1000;
  tim = true;
  email!:string;
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private userService:UserServiceService,
    private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
    
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
      email:[""]
    })

    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        // console.log(this.counter);
        if (this.counter == 0) {
          this.tim = false;
          this.countDown.unsubscribe();
        }
      });
  }
  get f (){
    return this.form.controls;
  }
  
  resend(){
    console.log("clicked");
      this.counter = 10;
      this.tick = 1000;
      this.tim = true;

      this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        
        if (this.counter == 0) {
          this.tim = false;
          this.countDown.unsubscribe();
        }
      });

      // this.http.get('http://localhost:5000/otpResend',{
      // withCredentials:true
      // })
      this.userService.resendOtp(this.email).subscribe((res:ApiResponse)=>{
         this.router.navigate(['/forgetOTP'], { queryParams: { email: this.email }})
        },(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
 
  submit():void{
    this.otpEntered = true
    if(this.form.valid){
      let formDetails =this.form.getRawValue()
      formDetails.email = this.email
      console.log(formDetails.otp,formDetails.email)
      
        this.userService.postOtp(formDetails).subscribe((res:ApiResponse)=> {
          this.router.navigate(['/resetPassword'], { queryParams: { email: this.email } })
        },(err)=>{
          console.log(err);
          
          this.message=err.error.message
        })
    }
    
     }
  


}
