import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitter'
import Swal from 'sweetalert2';

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

form!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        CompanyName:[this.CompanyName],
        brand:[this.brand],
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
      this.route.navigate(['/admin']);
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

   if(user.CompanyName==null||user.brand==null ||user.email==null||user.city==null){
    this.message = 'No Changes made'
   }else if(user.CompanyName===''||user.brand==='' ||user.email===''||user.city===''){
    this.message = 'Field can not be empty'
   }else
    {
    this.http.post('http://localhost:5000/admin/editDealer',user,{
      withCredentials: true
    }).subscribe(()=> this.route.navigate(['/admin/adminDealerManagement']),(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })
   }
}

getusers(userId:any){
  this.http.post(`http://localhost:5000/admin/editDealerDetails/${userId}`,{
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
