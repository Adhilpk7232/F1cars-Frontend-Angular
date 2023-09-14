import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-admin-brand-edit',
  templateUrl: './admin-brand-edit.component.html',
  styleUrls: ['./admin-brand-edit.component.css']
})
export class AdminBrandEditComponent implements OnInit {

  brand:any;
  brandId:any;
  image:any;
  selectedFile:any|File=null;
  postData:any;
  message:string='';
  

form!:FormGroup
constructor(private formBuilder:FormBuilder,private router:ActivatedRoute,
  private adminApi:AdminServiceService,
  private route:Router,private toastr:ToastrService){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        brand:[this.brand],

      })
 
      this.brandId = this.router.snapshot.paramMap.get('brandId');
      this.getbrands(this.brandId)
    }
    onFileSelected(event:any){
      this.selectedFile=<File>event.target.files[0]
    }

submit():void{
  const user = this.form.getRawValue();
  console.log(user.brand,"userData");
  if(user.brand ==null){
    this.message= 'No changes Made'
  }else if (user.brand === ''){
    this.message= 'Field canot be empty'
  }else{
    let formData: FormData = new FormData(); // Initialize formData here

  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('brand', user.brand);
  } else {
    let formData: FormData = new FormData(); // Set formData to undefined if there is no selected file
    formData.append('brand',user.brand);
    let imageEmpty ='0'
    formData.append('image',imageEmpty);
  }

    this.adminApi.editbrand(this.brandId,formData).subscribe((res:any) => { 
      console.log(res,"res of submit edit brands");
      
      this.toastr.success('Form Submitted','Successfully', { progressBar: true });
      this.route.navigate(['/admin/adminBrand'])
    },(err)=>{
        this.toastr.error(err.error.message ,'', {progressBar: true})
    })

  }
  
  
   
}
onBrandChange(event: Event) {
  const editedBrand = (event.target as HTMLInputElement).value;
  this.form.patchValue({
    brand: editedBrand
    
  });
  console.log(this.brand,"kiit")
  
}

getbrands(brandId:any){
   this.adminApi.getBrands(brandId).subscribe((response:any)=>{
    console.log(response);
    this.brand=response.brand
    this.image = response.image

  },(err)=>{
    console.log(err+"hhhhhhhhhhhhhhhhhhh");

  })
}
getImageUrl(image: string) {
  if(image){
    return this.adminApi.loadimage(image);
  }else {
    return null
  }
}
}
