import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit{

  name:any;
  email:any;
  city:any;
  userId:any;
  submitForm:boolean=false;
form!:FormGroup
message:string='';
constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:ActivatedRoute,
  private route:Router,
  private snackBar: MatSnackBar
  ){}
 
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: [this.name, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
        email: [this.email, [Validators.required, Validators.email]],

      })
 
      this.userId = this.router.snapshot.paramMap.get('userId');
 
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((response:any)=>{
        console.log(response);
        this.getusers(this.userId)
        Emitters.authEmiter.emit(true)
      },(err)=>{
      this.route.navigate(['/']);
      Emitters.authEmiter.emit(false)
      })
    }
    get f() {
      return this.form.controls;
    }
  submit():void{
    this.submitForm = true
    let user =this.form.getRawValue()
  console.log(user);
  if(user.name==null||user.email==null){
    this.message = "Nochanges made"
  }else if(user.name===''||user.email===''){
    this.message = "fields cannot be empty"
    }else
      {
      this.http.post(`http://localhost:5000/admin/editUser/${this.userId}`,user,{
        withCredentials: true
      }).subscribe(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        });
      this.route.navigate(['/admin/adminUserManagement'])
      }
      ,(err)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Your work has been not save',
          showConfirmButton: true,
          timer: 1500
        });
        this.message = err.error.message 
      })
    }
    // this.showSuccessSnackBar('Form submitted successfully!');
    
  }
  showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // The duration the snackbar will be shown in milliseconds
      panelClass: ['success-snackbar'], // Add your custom CSS class here if needed
    });
  }

  getusers(userId:any){
    this.http.post(`http://localhost:5000/admin/editUserDetails/${userId}`,{
      withCredentials:true
    }).subscribe((response:any)=>{
      console.log(response);
      this.name=response.name
      this.email=response.email
      Emitters.authEmiter.emit(true)
    },(err)=>{
      console.log(err+"hhhhhhhhhhhhhhhhhhh");
    this.route.navigate(['/admin']);
    Emitters.authEmiter.emit(false)
    })
  }
  }
