import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import{FormGroup,FormBuilder} from '@angular/forms'
import Swal from 'sweetalert2';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  form!:FormGroup;
  timer: number = 10; 
  timerRunning: boolean = false;
  otpEntered!:boolean;
  message!:string

  countDown!: Subscription;
  counter = 10;
  tick = 1000;
  tim = true;
  userEmail!:string;
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router , 
    private userService:UserServiceService,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private loaderService:LoaderserviceService
    ){
      this.route.queryParams.subscribe(params => {
        this.userEmail = decodeURIComponent(params['email']);
        // Now, you have the email address to use in your component.
      });
    }
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    // this.userId = this.route.snapshot.paramMap.get('userId');
    this.otpEntered=false;
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required,Validators.pattern('^[0-9]{1,4}$')]],
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
      const encodedEmail = encodeURIComponent(this.userEmail);
      const queryParams = { email: encodedEmail };
      this.userService.resendOtp(this.userEmail).subscribe((res:any)=> this.router.navigate(['/otp'],{queryParams}),(err)=>{
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
  get f (){
    return this.form.controls;
  }
 
  submit():void{
    this.otpEntered=true;

    if(this.form.valid){

      let otp =this.form.getRawValue()
  
      this.userService.verifyotp(otp,this.userEmail).subscribe((res:any)=>{ 
        this.toastr.success('Logined','Successfully', { progressBar: true });
        this.userService.saveToken(res.token);
        this.router.navigate(['/'])
      },(err)=>{
        this.message = err.error.message
      })
    }
    
     
  }


}
