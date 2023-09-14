import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitter'
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-dealer-edit',
  templateUrl: './admin-dealer-edit.component.html',
  styleUrls: ['./admin-dealer-edit.component.css']
})
export class AdminDealerEditComponent implements OnInit{

  CompanyName:any;
  brand:any;
  email:any;
  city:any;
  userId:any;
  message:string='';
  changed!:boolean;

form!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private adminApi:AdminServiceService,
  private route:Router,private toastr:ToastrService){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        CompanyName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        brand: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],

      })
 
      this.userId = this.router.snapshot.paramMap.get('userId');
 
      this.http.get('http://localhost:3000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getusers(this.userId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
      })
    }

submit():void{
  let user =this.form.getRawValue()
console.log(user);
if(user.name!== null|| user.email!== null||user.city!==null){
  this.changed = true
}else{
  this.message = 'No changes Made'
}
if(user.CompanyName == null){
  user.CompanyName =this.CompanyName
}
if(user.brand == null){
  user.brand = this.brand
}
if(user.email==null){
  user.email = this.email
}
if(user.city==null){
  user.city = this.city
}


if(user.CompanyName ===''||user.brnd ===''||user.email===''||user.city===''){
this.message = 'field must be required'
console.log(user,"final");

}else if(this.changed){
  this.adminApi.postEditDealer(this.userId,user).subscribe((res:any)=> {
    this.toastr.success('Form Submitted','Successfully', { progressBar: true });
    this.route.navigate(['/admin/adminDealerManagement'])
  },(err)=>{
    this.toastr.error(err.error.message ,'', {progressBar: true})
  })
    
    // this.http.post('http://localhost:3000/admin/editDealer',user,{
    //   withCredentials: true
    // }).subscribe(()=> {
    //   this.toastr.success('Form Submitted','Successfully', { progressBar: true });
    //   this.route.navigate(['/admin/adminDealerManagement'])
    // },(err)=>{
    //   this.toastr.error(err.error.message ,'', {progressBar: true})
    // })
   }
}

getusers(userId:any){
  this.http.post(`http://localhost:3000/admin/editDealerDetails/${userId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.CompanyName=response.CompanyName
    this.brand=response.brand
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
