import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import{FormGroup,FormBuilder ,Validators} from '@angular/forms'
import Swal from 'sweetalert2';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-otp',
  templateUrl: './admin-otp.component.html',
  styleUrls: ['./admin-otp.component.css']
})
export class AdminOTPComponent implements OnInit{

  form!:FormGroup;
  timer: number = 60; 
  timerRunning: boolean = false;
  otpEntered = false
  message!:string;
  countDown!: Subscription;
  counter = 10;
  tick = 1000;
  tim = true;
  adminEmail!:string;
  otp:any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router , private adminService:AdminServiceService
    ,private route:ActivatedRoute,private toastr:ToastrService){
      // this.route.queryParams.subscribe((params) => {
      //   this.adminEmail = decodeURIComponent(params['email']);
      // });
      this.route.queryParams.subscribe(params => {
        this.adminEmail = decodeURIComponent(params['email']);
        // Now, you have the email address to use in your component.
      });
    }
  ngOnInit(): void {
    
    // this.adminService.active().subscribe((res:any)=>{
      
    // },(err)=>{
    //   this.router.navigate(['/admin'])
    // })
    
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
      const queryParams = { email: this.adminEmail };
      this.adminService.resendOtp(this.adminEmail).subscribe((res:any)=> this.router.navigate(['/admin/adminOtp'],{queryParams}),(err)=>{
        this.message=err.error.message
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
    let formDetails =this.form.getRawValue()
    console.log(formDetails.otp)
    if(this.form.valid){
      this.adminService.verifyotp(formDetails,this.adminEmail).subscribe((res:any)=>{ 
        this.toastr.success('Logined','Successfully', { progressBar: true });
        this.adminService.saveToken(res.token);
        this.router.navigate(['/admin/adminHome'])
      },(err)=>{
        console.log(err.error.message);
        
        this.message=err.error.message
      })
    }
     
      
     
  }

}
