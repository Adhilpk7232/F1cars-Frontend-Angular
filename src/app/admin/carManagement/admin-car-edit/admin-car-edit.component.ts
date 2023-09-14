import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-car-edit',
  templateUrl: './admin-car-edit.component.html',
  styleUrls: ['./admin-car-edit.component.css']
})
export class AdminCarEditComponent implements OnInit{

  
  // carName:any;
  // description:any;
  // price:any;
  // maileage:any;
  // fuelType:any;
  // engine:any;
  // transmission:any;
  // bodyType:any;
  // seatCapacity:any;
  // safety:any;
  // role:any;
  // date:any;
  // brand:any;
  // image:any;
  colorFormArray!: FormArray;
  color: { colorImage:string}[] = [];

  colorData:any=[];
  colorsForm!:FormGroup
  formattedDate!:any
  originalCarData:any={};
  message:string='';
  showBrands:any;
  carId:any;
  selectedFile:any|File=null;

  carUpdateform!:FormGroup
constructor(private formBuilder:FormBuilder,private router:ActivatedRoute,
  private route:Router,private adminApi:AdminServiceService
){}
 
  ngOnInit(): void {
    
    
    this.colorsForm = this.formBuilder.group({});

  // Loop through the colors array and create form groups
  for (let i = 0; i < this.colorData.length; i++) {
    const color = this.colorData[i];
    const colorFormGroup = this.formBuilder.group({
      colorName: [color.colorName, Validators.required],
      selectColor: [color.color, Validators.required],
      colorImage: [color.colorImage, Validators.required],
    });

    // Add the form group to the main form
    this.colorsForm.addControl(`color_${i}`, colorFormGroup);
  }
    
      this.carUpdateform = this.formBuilder.group({
        color: new FormArray([
          new FormGroup({
            colorName:  new FormControl(''),
            color: new FormControl(''),
            colorImage : new FormControl('')
          })
        ]),
        
        carName: [this.originalCarData.carName,[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
          description: [this.originalCarData.description],
          price: [this.originalCarData.price],
          maileage: [this.originalCarData.maileage],
          engine: [this.originalCarData.engine],
          fuelType: [this.originalCarData.fuelType],
          transmission: [this.originalCarData.transmission],
          bodytype: [this.originalCarData.bodytype],
          seatCapacity: [this.originalCarData.seatCapacity],
          safety: [this.originalCarData.safety],
          brand: [this.originalCarData.brand],
          role: [this.originalCarData.role],
          date: [this.originalCarData.lauchedDate],         
        })
      this.colorFormArray = this.carUpdateform.get('color') as FormArray;
 
      this.carId = this.router.snapshot.paramMap.get('carId');
        this.getCarDetails(this.carId)

    }

    addColor() {
      const control = <FormArray>this.carUpdateform.controls['color'];
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
    const control = <FormArray>this.carUpdateform.controls['color'];
    control.removeAt(Index)
  }
  get colorControls(): AbstractControl[] {
    return (this.carUpdateform.get('color') as FormArray).controls;
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
      console.log(res);
      console.log(this.color);
      
      
    });
  }
  getAllBrands(){
    this.adminApi.getAllBrands().subscribe((response:any)=>{
      console.log(response);
      this.showBrands = response

    },(err)=>{
      console.log(err.error.message);
      
    })
  }

    onFileSelected(event:any){
      this.selectedFile=<File>event.target.files[0]
    }
submit():void{
  console.log(this.isFormEdited(),this.carUpdateform.valid,"chanched");

  
  if ( this.isFormEdited()) {
    let carData =this.carUpdateform.getRawValue()
    if(carData.carName == null){
      carData.carName=this.originalCarData.carName
    }
    if(carData.description == null){
      carData.description=this.originalCarData.description
    }
    if(carData.price == null){
      carData.price=this.originalCarData.price
    }
    if(carData.maileage == null){
      carData.maileage=this.originalCarData.maileage
    }
    if(carData.engine == null){
      carData.engine=this.originalCarData.engine
    }
    if(carData.fuelType == null){
      carData.fuelType=this.originalCarData.fuelType
    }
    if(carData.transmission == null){
      carData.transmission=this.originalCarData.transmission
    }
    if(carData.bodytype == null){
      carData.bodytype=this.originalCarData.bodytype
    }
    if(carData.seatCapacity == null){
      carData.seatCapacity=this.originalCarData.seatCapacity
    }
    if(carData.safety == null){
      carData.safety=this.originalCarData.safety
    }
    if(carData.brand == null){
      carData.brand=this.originalCarData.brand
    }
    if(carData.role == null){
      carData.role=this.originalCarData.role
    }
    if(carData.date == null){
      carData.date=this.originalCarData.lauchedDate
    }
      
      
      console.log(carData,"converted");
    
    console.log(carData,this.originalCarData,"first new");
    this.adminApi.updateCar(this.carId,carData).subscribe((res:any)=>{ 
      this.route.navigate(['/admin/adminCar'])
  },(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })
    console.log('Car data updated:', this.carUpdateform.value);
  } else {
    console.log('Form data is invalid or unchanged.');
    this.message = 'Form data is invalid or unchanged.'
  }
  
   
}
get f (){
  return this.carUpdateform.controls;
}

getCarDetails(carId:string){
  this.adminApi.getCarDetails(carId).subscribe((response:any)=>{
    console.log(response,"original adat");
    this.originalCarData = response
    this.colorData = response.colors
    console.log(this.originalCarData.transmission,"origibal adattransmission");

  },(err)=>{
    console.log(err.error.message);
    
  })
}
isFormEdited(): boolean {
  // Check if any form control value is different from original data
  return Object.keys(this.carUpdateform.value).some(
    key => this.carUpdateform.value[key] !== this.originalCarData[key]
  );
}

}
