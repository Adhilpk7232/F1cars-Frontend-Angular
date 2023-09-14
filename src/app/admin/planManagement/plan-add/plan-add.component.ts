import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit{

  form!:FormGroup
  selectedFile:any|File=null;
  constructor(
    private formBuilder:FormBuilder,
    private adminApi:AdminServiceService,
    private router:Router
    ){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
          name:'',
          description:'',
          validityMonth:null,
          price:null
          
        })
   
  }
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }
  
  
  submit():void{
  let planData =this.form.getRawValue()
  console.log(planData);

      this.adminApi.addPlan(planData).subscribe(()=> this.router.navigate(['/admin/planManagement']),(err)=>{
        Swal.fire('Error',err.error.message,"error")
      })
    //  }
  }
}
