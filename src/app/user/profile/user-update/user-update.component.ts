import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{

  previousName!:string;
  previousEmail!:string;
  previousCity!:string;
  previousState!:string;
  statesname!:string;
  stateId!:string;
  form!:FormGroup
  formChange!:boolean;
  userData:any;
  statesData:any[]=[]
  update!:boolean;
  constructor(private router:Router,private userApi:UserServiceService,private formBuilder:FormBuilder,private toastr:ToastrService){}

  ngOnInit(): void {
    this.update = false;
    this.getState()
    this.form =  this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      state: ['', Validators.required]
      
    })
    this.userApi.getUserDetails().subscribe((res:any) =>{
      this.userData  = res
      this.previousName = res.name
      this.previousEmail = res.email;
      this.previousCity = res.city
      this.previousState = res.state
      this.statesname = res.state.state
      console.log(this.statesname,"name");
      
      this.stateId = res.state._id
      console.log(this.stateId,"id");
      
      
      
    },(err) => { 
      console.log(err.error.message,"error from userdat fetching");
      this.router.navigate(['/'])
      
    })
    
   
  }
  get f () {
    return this.form.controls;
  }
  getState(){
    this.userApi.getStates().subscribe((res:any)=>{
      this.statesData = res.StatesData
    },(err) => { 
      this.router.navigate(['/admin/adminHome'])
    })
  }

  submit(){
    this.update = true;
    let updateUser = this.form.getRawValue()


    if(updateUser.name !== this.userData.name || updateUser.email !== this.userData.email || updateUser.city !== this.userData.city || updateUser.state !== this.userData.state){
      this.formChange=true
    }else{
      this.formChange = false
    }
    console.log(updateUser,"current");
    console.log(this.userData,"prev");
    if(this.formChange && this.form.valid){
      this.userApi.updateUser(updateUser).subscribe((res:any)=>{
        this.toastr.success('Deytails Updated','Successfully', { progressBar: true });
        this.router.navigate(['/profile'])
      },(err) => {
        this.toastr.error(err.error.message ,'', {progressBar: true})
        console.log(err.error.message);
        
      })
    }else{
      console.log("change any filed");
      
    }
    
     

  }

}
