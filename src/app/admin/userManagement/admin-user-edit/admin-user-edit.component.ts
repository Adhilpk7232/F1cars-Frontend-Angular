import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit{

  currentname!:string;
  currentemail!:string;
  oldName!:string;
  oldEmail!:string;
  city!:string;
  userId!:string|null;
  submitForm:boolean=false;
form!:FormGroup
message:string='';
changed!:boolean;
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router,
  private toastr:ToastrService,
  private adminApi:AdminServiceService
  ){}
 
  ngOnInit(): void {
    
    this.changed = false
      this.form = this.formBuilder.group({
        name: [this.currentname, [Validators.required, Validators.minLength(3)]],
        email: [this.currentemail, [Validators.required, Validators.email]],

      })
 
      this.userId = this.router.snapshot.paramMap.get('userId');
      this.getusers(this.userId)

    }
    get f() {
      return this.form.controls;
    }
  submit():void{
    
    let user =this.form.getRawValue()
    
    
  console.log(user.name == this.oldName,user.name,this.oldName,this.currentname);
  if(user.name == this.oldName && user.email == this.oldEmail ){
    this.message = 'No changes Made'
    return
  }else{
    this.changed = true
  }
  this.submitForm = true
  if(this.changed && this.form.valid){
    if(this.userId == null){
      return
    }

    this.adminApi.userEdit(this.userId,user).subscribe(()=>{
        this.toastr.success('Form Submitted','Successfully', { progressBar: true });
      this.route.navigate(['/admin/adminUserManagement'])
      }
      ,(err)=>{
        // this.toastr.error(err.error.message ,'', {progressBar: true})
        this.message = err.error.message 
      })
  }
      

    
  }

  getusers(userId:string|null){
    if(userId == null){
      return
    }
    this.adminApi.getUserInfo(userId).subscribe((response:UserModel)=>{
      console.log(response);
      this.currentname=response.name
      this.oldName = response.name
      this.oldEmail = response.email
      this.currentemail=response.email
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    })
  }
  }
