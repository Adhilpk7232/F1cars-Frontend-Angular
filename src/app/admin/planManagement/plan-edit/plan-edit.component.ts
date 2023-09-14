import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit{

  form!:FormGroup
  planId:any; plan:any;
  namePrevious!:string;
  descriptionPrevious!:string;
  validityMonthsPrevious!:number;
  pricePrevious!:number;
  message!:string;
  changed!:boolean;
  submitForm!:boolean
  name!:string;
  description!:string;
  price!:number;
  validityMonths!:number

  constructor(private route: ActivatedRoute,private router:Router,private adminApi:AdminServiceService,private formBuilder:FormBuilder,private http:HttpClient){
    
  }
  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('planId');
    this.getPreviousData(this.planId)
    this.changed = false

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      validityMonth: ['', [Validators.required, Validators.max(12)]], // Max value is 11 (0-11 months)
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      
    })
  }

  get f() {
    return this.form.controls;
  }
  submit():void{
    let planData =this.form.getRawValue()
    console.log(planData,"formData");
    console.log(planData.name === '',"formData" ,planData.name);

    if(planData.name == this.namePrevious&&      planData.description == this.descriptionPrevious&&    planData.validityMonth == this.validityMonthsPrevious&&   planData.price == this.pricePrevious){
      this.message = 'No changes Made'
      return 
    }else{
      this.changed = true
      this.submitForm = true
    }
  
   
    if(this.form.valid && this.changed){
      this.adminApi.updatePlan(this.planId,planData).subscribe(()=> {
          this.router.navigate(['/admin/planManagement'])
       },(err)=>{
          Swal.fire('Error',err.error.message,"error")
        })
    }
        
      //  }
    }
    getPreviousData(planId:string|null){
      if(planId == null){
        return
      }
      this.adminApi.getPlandetailsForUpdate(this.planId).subscribe((res:any)=>{
        this.namePrevious =res.name
        this.descriptionPrevious = res.description
        this.validityMonthsPrevious = res.validityMonth
        this.pricePrevious = res.price
        this.name =res.name
        this.description = res.description
        this.validityMonths = res.validityMonth
        this.price = res.price
      })
    }
}
