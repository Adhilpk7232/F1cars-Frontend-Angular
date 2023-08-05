import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from '../../../emitters/emitter';

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
          carName:'',
          description:'',
          price:'',
          maileage:'',
          engine:'',
          fuelType:'',
          transmission:'',
          bodyType:'',
          seatCapacity:'',
          safety:'',
          brand:'',
          role:'',
          date:'',
          image:''


        })
   
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }
  
  submit():void{
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
  formData.append('bodyType',car.bodyType)
  formData.append('seatCapacity',car.seatCapacity)
  formData.append('safety',car.safety)
  formData.append('brand',car.brand)
  formData.append('role',car.role)
  formData.append('date',car.date)




     if(car.carName==""||car.description==""||car.price==""){
      Swal.fire('Error',"please enter all fields","error")
     }else{
      this.http.post('http://localhost:5000/admin/addCar',formData,{
        withCredentials: true
      }).subscribe(()=> this.router.navigate(['/admin/adminCar']),(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
     }
  }



}
