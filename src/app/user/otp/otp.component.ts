import { Component ,OnInit} from '@angular/core';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormGroup,FormBuilder} from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      otp:null
    })
  }
 
  submit():void{
    let otp =this.form.getRawValue()
  console.log(otp);
     if(otp == null){
      Swal.fire('Error',"please enter all fields","error")
     }else if(otp==''){
      Swal.fire('Error',"please enter valid otp","error")
     }else{
      this.http.post('http://localhost:5000/otpVerify',otp,{
        withCredentials: true
      }).subscribe(()=> this.router.navigate(['/']),(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }

}
