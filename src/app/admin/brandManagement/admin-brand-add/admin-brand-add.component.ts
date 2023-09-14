import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-brand-add',
  templateUrl: './admin-brand-add.component.html',
  styleUrls: ['./admin-brand-add.component.css']
})
export class AdminBrandAddComponent implements OnInit {

  form!:FormGroup
  selectedFile:any|File=null;
  constructor(private toastr: ToastrService,private formBuilder:FormBuilder,
    private router:Router,
    private adminApi:AdminServiceService
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
          name:''
          
        })
  }
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }
  
  
  submit():void{
    const formData = new FormData();
  formData.append('image',this.selectedFile,this.selectedFile.name);
  console.log(formData.append);
  let user =this.form.getRawValue()
  console.log(user);
  formData.append('name',user.name)

      this.adminApi.AddBrand(formData).subscribe((res:any) =>{
        this.toastr.success('Form Submitted','Successfully', { progressBar: true });
        this.router.navigate(['/admin/adminBrand'])
      },(err) =>{
        this.toastr.error(err.error.message ,'', {progressBar: true})
      })

  }
}
