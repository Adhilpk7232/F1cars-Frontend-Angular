import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitter';
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
  reviewerId:any;
  message:string='';

form!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:[this.name],
        email:[this.email],
        city:[this.city]

      })
 
      this.reviewerId = this.router.snapshot.paramMap.get('reviewerId');
 
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getreviewer(this.reviewerId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/']);
      Emitters.authEmiter.emit(false)
      })
    }


submit():void{
  let user =this.form.getRawValue()
console.log(user,"clicked");
if(user.name == null||user.email==null||user.city==null){
 this.message = 'No changes Made'
}else if(user.name ===''||user.email===''||user.city===''){
  this.message = 'field must be required'

}else{
  this.http.post('http://localhost:5000/admin/editReviewer',user,{
      withCredentials: true
    }).subscribe((res:any)=> {
      Swal.fire('Success', 'Operation completed successfully!', 'success');
      this.route.navigate(['/admin/adminExpertReviewerManagement'])
    },(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })

}


  
    
   
}

getreviewer(reviewerId:any){
  this.http.post(`http://localhost:5000/admin/editReviewerDetails/${reviewerId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.name=response.name
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
