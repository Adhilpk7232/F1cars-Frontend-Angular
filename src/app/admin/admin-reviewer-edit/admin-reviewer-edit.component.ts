import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../../emitters/emitter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-reviewer-edit',
  templateUrl: './admin-reviewer-edit.component.html',
  styleUrls: ['./admin-reviewer-edit.component.css']
})
export class AdminReviewerEditComponent implements OnInit{
  name:any;
  email:any;
  city:any;
  userId:any;

form!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:[this.name],
        email:[this.email],
        city:[this.city]

      })
 
      this.userId = this.router.snapshot.paramMap.get('userId');
 
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getusers(this.userId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/']);
      Emitters.authEmiter.emit(false)
      })
    }
validateEmail=(email:any)=>{
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(email.match(validRegex)){
  return true;

  }else{
  return false;
  }
}

submit():void{
  let user =this.form.getRawValue()
console.log(user);
user.email=this.email
   if(user.name==null){
    Swal.fire('Error',"Nochanges made","error")
   }else if(user.CompanyName==''){
    Swal.fire('Error',"fields cannot be empty","error")
   }else
    {
    this.http.post('http://localhost:5000/admin/editReviewer',user,{
      withCredentials: true
    }).subscribe(()=> this.route.navigate(['/adminExpertReviewerManagement']),(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })
   }
}

getusers(userId:any){
  this.http.post(`http://localhost:5000/admin/editReviewerDetails/${userId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.name=response.CompanyName
    this.email=response.email
    this.city=response.city
    Emitters.authEmiter.emit(true)
  },(err)=>{
    console.log(err+"hhhhhhhhhhhhhhhhhhh");
  this.route.navigate(['/admin']);
  Emitters.authEmiter.emit(false)
  })
}
}
