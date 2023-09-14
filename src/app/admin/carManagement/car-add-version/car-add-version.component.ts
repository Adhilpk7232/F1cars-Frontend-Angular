import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { ExcelService } from 'src/app/services/excel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-add-version',
  templateUrl: './car-add-version.component.html',
  styleUrls: ['./car-add-version.component.css']
})
export class CarAddVersionComponent implements OnInit{
  form!:FormGroup
  carId!:string|null;
  carData:any;
  selectedFile: File | null = null;
  selectedSpecFile: File | null = null;
  constructor(private route:ActivatedRoute,private adminApi:AdminServiceService , private formBuilder:FormBuilder,
    private excelService:ExcelService,
    private toastr:ToastrService,
    private router:Router){}
  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId');
    this.getCarDetails(this.carId)
    this.form = this.formBuilder.group({
      version:'',
      color:[],
      fuelType:'',
      transmission:'',
      price:''

      

    })
  }
  getCarDetails(carId:string|null){
    if(carId == null){
      return
    }
    this.adminApi.getCarDetails(carId).subscribe((res:any) => { 
      this.carData = res
      console.log(res,"carDaya");
      
    },(err) => { 
      console.log(err.error.message);
      
    })
  }
  onFileSelectedSpec(event: any) {
    this.selectedSpecFile = event.target.files[0];
  }
  onFileSelectedFeature(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  submit(){
    console.log('hello');
    
    if(this.carId == null){
      return
    }
    if (this.form.valid && this.selectedSpecFile ) {
      const formData = this.form.value;
      console.log(formData);

      const postData = new FormData()
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          postData.append(key, formData[key]);
        }
      }

      postData.append('excelSpecification',this.selectedSpecFile)
      // postData.append('excelFeature',this.selectedFile)

      this.adminApi.addVersion(this.carId,postData).subscribe((rea:any) => { 
        this.router.navigate(['/admin/adminCar'])
      },(err) => { 
        console.log(err.error.message);
        
      })
    
  }
  }

  generateExcel() {

    // console.log('called');
     this.excelService.generateExcel();
     this.toastr.success('Downloading file...', 'Download Notification');
   }

   generateFeaturesExcel(){
    this.excelService.generateFeaturesExcel()
   }
 
}
