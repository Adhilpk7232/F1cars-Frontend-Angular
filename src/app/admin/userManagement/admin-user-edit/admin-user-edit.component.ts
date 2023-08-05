import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit{

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
// user.email=this.email
// user.name=this.name
if(user.name==null||user.email==null){
 Swal.fire('Error',"Nochanges made","error")
}else if(user.name===''||user.email===''){
    Swal.fire('Error',"fields cannot be empty","error")
   }else
    {
    this.http.post(`http://localhost:5000/admin/editUser/${this.userId}`,user,{
      withCredentials: true
    }).subscribe(()=> this.route.navigate(['/admin/adminUserManagement']),(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })
   }
}

getusers(userId:any){
  this.http.post(`http://localhost:5000/admin/editUserDetails/${userId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.name=response.name
    this.email=response.email
    Emitters.authEmiter.emit(true)
  },(err)=>{
    console.log(err+"hhhhhhhhhhhhhhhhhhh");
  this.route.navigate(['/admin']);
  Emitters.authEmiter.emit(false)
  })
}
}
