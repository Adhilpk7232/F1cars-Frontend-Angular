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

@Component({
  selector: 'app-forget-otp',
  templateUrl: './forget-otp.component.html',
  styleUrls: ['./forget-otp.component.css']
})
export class ForgetOtpComponent implements OnInit {

  form!:FormGroup;
  timer: number = 60; 
  timerRunning: boolean = false;
  otpEntered = false
  message!:string;
  countDown!: Subscription;
  counter = 60;
  tick = 1000;
  tim = true;
  email:String='';
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router , private userService:UserServiceService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
    
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
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
      this.counter = 60;
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
      this.userService.resendOtp().subscribe((res:any)=> this.router.navigate(['/forgetOTP']),(err)=>{
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
    let otp =this.form.getRawValue()
  console.log(otp);
     if(otp == null){
      Swal.fire('Error',"please enter all fields","error")
     }else if(otp==''){
      Swal.fire('Error',"please enter valid otp","error")
     }else{
      // this.http.post('http://localhost:5000/otpVerify',otp,{
      //   withCredentials: true
      // })
      this.userService.verifyotp(otp).subscribe((res:any)=> this.router.navigate(['/']),(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }


}
