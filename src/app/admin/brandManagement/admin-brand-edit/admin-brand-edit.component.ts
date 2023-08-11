import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';

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
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        brand:[this.brand],

      })
 
      this.brandId = this.router.snapshot.paramMap.get('brandId');
 
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getbrands(this.brandId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
      })
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

  
  
    this.http.post(`http://localhost:5000/admin/editBrand/${this.brandId}`,formData,{
      withCredentials: true
    }).subscribe(()=> {
      Swal.fire('Success', 'Operation completed successfully!', 'success');
      this.route.navigate(['/admin/adminBrand'])},(err)=>{
      Swal.fire('Error',err.error.message,"error")
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
  this.http.post(`http://localhost:5000/admin/getBrandDetails/${brandId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.brand=response.brand
    this.image = response.image
    Emitters.authEmiter.emit(true)
  },(err)=>{
    console.log(err+"hhhhhhhhhhhhhhhhhhh");
  this.route.navigate(['/admin']);
  Emitters.authEmiter.emit(false)
  })
}

}
