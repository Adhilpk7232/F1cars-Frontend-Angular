import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';

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

  showBrands:any;
  carId:any;
  selectedFile:any|File=null;

form!:FormGroup
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
      this.form = this.formBuilder.group({
        
          carName:[this.carName],
          description:[this.description],
          price:[this.price],
          maileage:[this.maileage],
          engine:[this.engine],
          fuelType:[this.fuelType],
          transmission:[this.transmission],
          bodyType:[this.bodyType],
          seatCapacity:[this.seatCapacity],
          safety:[this.safety],
          brand:[this.brand],
          role:[this.role],
          date:[this.date],
          image:[this.image],

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
    onFileSelected(event:any){
      this.selectedFile=<File>event.target.files[0]
    }

submit():void{
  let user =this.form.getRawValue()
  console.log(user);
   
    this.http.post('http://localhost:5000/admin/editDealer',user,{
      withCredentials: true
    }).subscribe(()=> this.route.navigate(['/admin/adminDealerManagement']),(err)=>{
      Swal.fire('Error',err.error.message,"error")
    })
   
}

getCarDetails(carId:any){
  this.http.post(`http://localhost:5000/admin/editCarDetails/${carId}`,{
    withCredentials:true
  }).subscribe((response:any)=>{
    console.log(response);
    this.carName=response.carName;
    this.description=response.description;
    this.price=response.price;
    this.maileage=response.maileage;
    this.fuelType=response.fuelType;
    this.engine=response.engine;
    this.transmission=response.transmission;
    this.bodyType=response.bodytype;
    this.seatCapacity=response.seatCapacity;
    this.safety=response.safety;
    this.role=response.role
    this.date=response.date
    this.brand=response.brand
    this.image=response.imag
    
    Emitters.authEmiter.emit(true)
  },(err)=>{
    console.log(err+"hhhhhhhhhhhhhhhhhhh");
  this.route.navigate(['/admin']);
  Emitters.authEmiter.emit(false)
  })
}

}
