import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-tax-edit',
  templateUrl: './tax-edit.component.html',
  styleUrls: ['./tax-edit.component.css']
})
export class TaxEditComponent {
  form!:FormGroup
  submitform:boolean=false;
  taxId!:string|null;
  TaxData:any;
  Oldcountry!:string;
  Oldstate!:string;
  Oldtax!:number;
  country!:string;
  state!:string;
  tax!:number;
  message!:string
  changed!:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private adminApi:AdminServiceService,
    private toastr:ToastrService,
    private route:ActivatedRoute
    ){}
  ngOnInit(): void {
    this.taxId = this.route.snapshot.params['taxId'];
    console.log(this.taxId,"taxId in params");
    this.getTaxDetails(this.taxId)
    this.form = this.formBuilder.group({
      country: [this.Oldcountry, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: [this.Oldstate, [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      tax: [this.Oldtax, [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
    });
    
  }
  get f (){
    return this.form.controls;
  }
  submit(){
    this.submitform = true
    let taxData =this.form.getRawValue()
    if(taxData.country == this.Oldcountry && taxData.state == this.Oldstate&& taxData.tax == this.Oldtax){
      this.message = 'No changes made'
      return
    }else{
      this.changed  =true
    }
    if(this.form.valid && this.changed){
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
  getTaxDetails(taxId:string|null){
    if(taxId == null){
      return
    }
    this.adminApi.getTaxInfo(taxId).subscribe((res:any) => {
      this.TaxData = res
      this.Oldcountry = res.country
      this.Oldstate = res.state
      this.Oldtax = res.tax
      this.country = res.country
      this.state = res.state
      this.tax = res.tax

      console.log(res,"tacAdara");
      
    },(err) =>{
      console.log(err.error.message);
      
    })
    
  }
}
