import { Component,OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tax-create',
  templateUrl: './tax-create.component.html',
  styleUrls: ['./tax-create.component.css']
})
export class TaxCreateComponent implements OnInit{

  form!:FormGroup
  submitform:boolean=false;
  constructor(private formBuilder:FormBuilder,private router:Router, private adminApi:AdminServiceService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      tax: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
    });
  }
  get f (){
    return this.form.controls;
  }
  submit(){
    this.submitform = true
    if(this.form.valid){
      let taxDeatails = this.form.getRawValue()
      console.log(taxDeatails);
      this.adminApi.addTaxDetails(taxDeatails).subscribe((res:String) => { 
        this.toastr.success('Form Submitted','Successfully', { progressBar: true });
        this.router.navigate(['/admin/taxManagement'])
      },(err) => { 
        this.toastr.error(err.error.message ,'', {progressBar: true})
      })
      
    }
    

    
  }
}
