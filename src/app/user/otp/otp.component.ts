import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormGroup,FormBuilder} from '@angular/forms'
import Swal from 'sweetalert2';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  form!:FormGroup;
  timer: number = 60; 
  timerRunning: boolean = false;

  countDown!: Subscription;
  counter = 60;
  tick = 1000;
  tim = true;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router , private userService:UserServiceService){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      otp:null
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
  
  resend(){
    console.log("clicked");
      this.counter = 60;
      this.tick = 1000;
      this.tim = true;

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

      // this.http.get('http://localhost:5000/otpResend',{
      // withCredentials:true
      // })
      this.userService.resendOtp().subscribe((res:any)=> this.router.navigate(['/otp']),(err)=>{
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
