import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitter';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-reviewer-edit',
  templateUrl: './admin-reviewer-edit.component.html',
  styleUrls: ['./admin-reviewer-edit.component.css']
})
export class AdminReviewerEditComponent implements OnInit{
  oldname!:string;
  oldemail!:string;
  oldcity!:string;
  reviewerId:any;
  message:string='';
  currentName!:string
  currentEmail!:string
  cuurentCity!:string
  submitclicked:boolean = false
  reviewerData:any;
  changed!:boolean;

form!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router,private toastr:ToastrService,
  private adminApi:AdminServiceService){}
 
  ngOnInit(): void {
    this.submitclicked = false
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],

      })
 
      this.reviewerId = this.router.snapshot.paramMap.get('reviewerId');
 
      this.http.get('http://localhost:3000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        // this.getreviewer(this.reviewerId)
        this.getReviewer(this.reviewerId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
      })
    }

    // get formControls() {
    //   return this.form.controls;
    // }

  getReviewer(reviewerId:string){

    this.adminApi.getReviewerData(reviewerId).subscribe((res:any) => {
      this.reviewerData = res
      console.log(res);
      this.oldname=res.name
      this.oldemail=res.email
      this.oldcity=res.city
      this.currentName=res.name
      this.currentEmail=res.email
      this.cuurentCity=res.city
      
    },(err) => { 
      console.log(err.error.message);
      
    })
  }

submit():void{
  this.submitclicked = true
  let user =this.form.getRawValue()

  if(user.name == this.oldname && user.email == this.oldemail && user.city == this.oldcity){
    this.message = 'No changes Made'
  }else{
    this.changed = true
  }

console.log(this.form.valid,"formvalidation");

 if(this.changed && this.form.valid){

    this.adminApi.postEditReviewer(this.reviewerId,user).subscribe((res:any)=> {
    this.toastr.success('Form Submitted','Successfully', { progressBar: true });
    this.route.navigate(['/admin/adminExpertReviewerManagement'])
  },(err)=>{
    this.toastr.error(err.error.message ,'', {progressBar: true})
  })
}
    
}

}
