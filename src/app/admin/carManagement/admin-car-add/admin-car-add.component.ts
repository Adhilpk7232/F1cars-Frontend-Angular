import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from '../../../emitters/emitter';
import { Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-car-add',
  templateUrl: './admin-car-add.component.html',
  styleUrls: ['./admin-car-add.component.css']
})
export class AdminCarAddComponent implements OnInit{

   
   
  form!:FormGroup
  innerForm!:FormGroup
  color: { colorImage:string}[] = [];
  colorFormArray!: FormArray;
  keyFeaturesFormArray!:FormArray
  brand:any;
  selectedFile:any|File=null;
  // imageUrl:any
  constructor(private formBuilder:FormBuilder,private adminApi:AdminServiceService,
    private router:Router){}
   
    ngOnInit(): void {

      this.getAllBrands()
        this.form = this.formBuilder.group({
          color: new FormArray([
            new FormGroup({
              colorName:  new FormControl(''),
              color: new FormControl(''),
              colorImage : new FormControl('')
            })
          ]),
          keyFeatures: new FormArray([
            new FormGroup({
              Features:  new FormControl(''),
              
            })
          ]),
          carName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
          description: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
          price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          mailage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          engine: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          fuelType: ['', Validators.required],
          transmission:['', Validators.required],
          bodyType:['', Validators.required],
          seatCapacity:['', Validators.required],
          safety:['', Validators.required],
          brand:['', Validators.required],
          role:['', Validators.required],
          date:['', Validators.required],
          image:'',
          

        })
        this.colorFormArray = this.form.get('color') as FormArray;
        this.keyFeaturesFormArray = this.form.get('keyFeatures') as FormArray;
        
   
  }
  getAllBrands(){
    this.adminApi.getAllBrands().subscribe((response:any)=>{
      console.log(response);
      this.brand = response
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err.error);
      
    })
  }
  
  addColor() {
    const control = <FormArray>this.form.controls['color'];
    control.push(
      new FormGroup({
        colorName:  new FormControl(''),
        color: new FormControl(''),
        colorImage: new FormControl('')
      })
    )
}
revomeColor(Index:any){
  if(Index == 0){
    return
  }
  const control = <FormArray>this.form.controls['color'];
  control.removeAt(Index)
}
get colorControls(): AbstractControl[] {
  return (this.form.get('color') as FormArray).controls;
}

onImageChange(event: any, index: number) {
  this.selectedFile = <File> event.target.files[0];

  if (!this.selectedFile) {
    return;
  }

  const formData = new FormData();
  formData.append('image', this.selectedFile, this.selectedFile.name);

  this.adminApi.imageUpload(formData).subscribe((res: any) => {
    const imageUrl = res; // Make sure your response structure matches this
    this.color.push({colorImage: res})

  });
}

addKeyFeature() {
  const control = <FormArray>this.form.controls['keyFeatures'];
  control.push(
    new FormGroup({
      Features:  new FormControl(''),
    })
  )
}
revomeKeyFeature(Index:any){
  if(Index == 0){
    return
  }
  const control = <FormArray>this.form.controls['keyFeatures'];
  control.removeAt(Index)
}

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }

  
  get keyControls(): AbstractControl[] {
    return (this.form.get('keyFeatures') as FormArray).controls;
  }

  submit():void{
    console.log(this.color);

    
    if(this.selectedFile == null){
      Swal.fire('Error',"please enter all fields","error")
    }else{
      console.log(this.selectedFile);
      
    const formData = this.form.value;
    formData.color.forEach((color: any, index: number) => {
      color.colorImage = this.color[index].colorImage;
    });
    console.log(formData,"fookj");
    
    const postData = new FormData()
      console.log(this.selectedFile,this.selectedFile.name,"IMAGE KITTY");
      console.log(formData.color[0].colorImage,"coloimg");
      
      
    // postData.append('color',formData.color)
    postData.append('color', JSON.stringify(formData.color));
    postData.append('image',this.selectedFile,this.selectedFile.name);
    postData.append('carName',formData.carName)
    postData.append('description',formData.description)
    postData.append('price',formData.price)
    postData.append('maileage',formData.mailage)
    postData.append('engine',formData.engine)
    postData.append('fuelType',formData.fuelType)
    postData.append('transmission',formData.transmission)
    postData.append('bodyType',formData.bodyType)
    postData.append('seatCapacity',formData.seatCapacity)
    postData.append('safety',formData.safety)
    postData.append('brand',formData.brand)
    postData.append('role',formData.role)
    postData.append('date',formData.date)
    console.log(postData);
    
    if(formData.carName==""||formData.description==""||formData.price==""||formData.role==""||formData.date==""||formData.color.length == 0 ||
    formData.maileage==""||formData.engine==""||formData.fuelType==""||formData.transmission==""||formData.bodyType==""||formData.seatCapacity=="" ||formData.safety==""||formData.brand==""
    ){
      Swal.fire('Error',"please enter all fields","error")
    }else{
      this.adminApi.addCar(formData).subscribe(()=> {
        Swal.fire('Success', 'Operation completed successfully!', 'success');
        this.router.navigate(['/admin/adminCar'])
      },(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
      }
    }
  }
}