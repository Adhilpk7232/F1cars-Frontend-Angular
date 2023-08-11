import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-car-edit',
  templateUrl: './admin-car-edit.component.html',
  styleUrls: ['./admin-car-edit.component.css']
})
export class AdminCarEditComponent implements OnInit{

  
  carName:any;
  description:any;
  price:any;
  maileage:any;
  fuelType:any;
  engine:any;
  transmission:any;
  bodyType:any;
  seatCapacity:any;
  safety:any;
  role:any;
  date:any;
  brand:any;
  image:any;

  originalCarData:any={};
  message:string='';
  showBrands:any;
  carId:any;
  selectedFile:any|File=null;

  carUpdateform!:FormGroup
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router){}
 
  ngOnInit(): void {
    this.http.get('http://localhost:5000/admin/brand',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.showBrands = response
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.route.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
      this.carUpdateform = this.formBuilder.group({
        
        carName: [this.originalCarData.carName],
          // description:[this.description],
          description: [this.originalCarData.description],
          // price:[this.price],
          price: [this.originalCarData.price],
          // maileage:[this.maileage],
          maileage: [this.originalCarData.maileage],
          // engine:[this.engine],
          engine: [this.originalCarData.engine],
          // fuelType:[this.fuelType],
          fuelType: [this.originalCarData.fuelType],
          // transmission:[this.transmission],
          transmission: [this.originalCarData.transmission],
          // bodyType:[this.bodyType],
          bodytype: [this.originalCarData.bodytype],
          // seatCapacity:[this.seatCapacity],
          seatCapacity: [this.originalCarData.seatCapacity],
          // safety:[this.safety],
          safety: [this.originalCarData.safety],
          // brand:[this.brand],
          brand: [this.originalCarData.brand],
          // role:[this.role],
          role: [this.originalCarData.role],
          // date:[this.date],
          date: [this.originalCarData.date],
          

      })
 
      this.carId = this.router.snapshot.paramMap.get('carId');
      console.log(this.carId,'id from atholokam');
      
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getCarDetails(this.carId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
      })
    }
    // onFileSelected(event:any){
    //   this.selectedFile=<File>event.target.files[0]
    // }

submit():void{
  console.log(this.isFormEdited(),this.carUpdateform.valid,"chanched");

  
  if ( this.isFormEdited()) {
    let carData =this.carUpdateform.getRawValue()
    
    const propertiesToUpdate = [
      'carName', 'description', 'price', 'maileage', 'engine',
      'fuelType', 'transmission', 'bodyType', 'seatCapacity',
      'safety', 'brand', 'role', 'date'
    ];
    
    for (const property of propertiesToUpdate) {
      if (carData[property] === null) {
        carData[property] = this.originalCarData[property];
      }
    }
    console.log(carData,this.originalCarData,"first new");
    this.http.post('http://localhost:5000/admin/updateCar',carData,{
      withCredentials: true
    }).subscribe(()=> this.route.navigate(['/admin/adminCar']),(err)=>{
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

getCarDetails(carId:any){
  this.http.post(`http://localhost:5000/admin/editCarDetails/${carId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response,"original adat");
    this.originalCarData = response
    // this.carName=response.carName;
    // this.description=response.description;
    // this.price=response.price;
    // this.maileage=response.maileage;
    // this.fuelType=response.fuelType;
    // this.engine=response.engine;
    // this.transmission=response.transmission;
    // this.bodyType=response.bodytype;
    // this.seatCapacity=response.seatCapacity;
    // this.safety=response.safety;
    // this.role=response.role
    // this.date=response.date
    // this.brand=response.brand
    // this.image=response.imag
    
    Emitters.authEmiter.emit(true)
    Swal.fire('Success', 'Operation completed successfully!', 'success');

  },(err)=>{
    Swal.fire('Error',err.error.message,"error")
  this.route.navigate(['/admin']);
  Emitters.authEmiter.emit(false)
  })
}
isFormEdited(): boolean {
  // Check if any form control value is different from original data
  return Object.keys(this.carUpdateform.value).some(
    key => this.carUpdateform.value[key] !== this.originalCarData[key]
  );
}

}
