import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from '../../../emitters/emitter';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-car-add',
  templateUrl: './admin-car-add.component.html',
  styleUrls: ['./admin-car-add.component.css']
})
export class AdminCarAddComponent implements OnInit{

   
   
  form!:FormGroup
  
  brand:any;
  selectedFile:any|File=null;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private router:Router){}
   
    ngOnInit(): void {

      this.http.get('http://localhost:5000/admin/brand',{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.brand = response
      Emitters.authEmiter.emit(true)
    },(err)=>{
    this.router.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
      
      
        this.form = this.formBuilder.group({
          carName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
          description: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
          price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          mileage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          engine: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          fuelType: ['', Validators.required],
          transmission:['', Validators.required],
          bodyType:['', Validators.required],
          seatCapacity:['', Validators.required],
          safety:['', Validators.required],
          brand:['', Validators.required],
          role:['', Validators.required],
          date:['', Validators.required],
          image:''


        })
   
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }
  
  submit():void{
    
    if(this.selectedFile == null){
      Swal.fire('Error',"please enter all fields","error")
    }else{
      let car =this.form.getRawValue()
  console.log(car);
  const formData = new FormData();
  formData.append('image',this.selectedFile,this.selectedFile.name);
  formData.append('carName',car.carName)
  formData.append('description',car.description)
  formData.append('price',car.price)
  formData.append('maileage',car.maileage)
  formData.append('engine',car.engine)
  formData.append('fuelType',car.fuelType)
  formData.append('transmission',car.transmission)
  formData.append('bodytype',car.bodytype)
  formData.append('seatCapacity',car.seatCapacity)
  formData.append('safety',car.safety)
  formData.append('brand',car.brand)
  formData.append('role',car.role)
  formData.append('date',car.date)
     if(car.carName==""||car.description==""||car.price=="" ){
      Swal.fire('Error',"please enter all fields","error")
     }else{
      this.http.post(`http://localhost:5000/admin/addCar`,formData,{
        withCredentials: true
      }).subscribe(()=> {
        Swal.fire('Success', 'Operation completed successfully!', 'success');
        this.router.navigate(['/admin/adminCar'])
      },(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }
 }
    
 markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  }); 
 }

}
