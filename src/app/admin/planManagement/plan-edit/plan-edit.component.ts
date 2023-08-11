import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  namePrevious:String='' 
  descriptionPrevious:String = '' 
  validityMonthsPrevious:Number=0 
  pricePrevious:Number=0
  constructor(private route: ActivatedRoute,private router:Router,private adminApi:AdminServiceService,private formBuilder:FormBuilder,private http:HttpClient){}
  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('planId');
    this.adminApi.getPlandetailsForUpdate(this.planId).subscribe((res:any)=>{
      this.namePrevious =res.name
      this.descriptionPrevious = res.description
      this.validityMonthsPrevious = res.validityMonth
      this.pricePrevious = res.price
    })

    this.form = this.formBuilder.group({
      name:'',
      description:'',
      validityMonth:null,
      price:null
      
    })
  }


  submit():void{
    let planData =this.form.getRawValue()
    console.log(planData,"formData");
    console.log(this.planId);
    
  
        this.http.post(`http://localhost:5000/admin/updatePlan/${this.planId}`,planData,{
          withCredentials: true
        }).subscribe(()=> this.router.navigate(['/admin/planManagement']),(err)=>{
          Swal.fire('Error',err.error.message,"error")
        })
      //  }
    }
}
