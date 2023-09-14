import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';
ToastrService

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit{

  
  form!: FormGroup;
  htmlContent='';
  carId:any;
  selectedFile:any|File=null;
  ImageFieldError!:boolean
  submitForm!:boolean;
  config:AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate:'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private route:ActivatedRoute
    ,private toastr:ToastrService,
    private reviewerApi:ReviewerServiceService
    ){}
  ngOnInit(): void {
    this.submitForm = false 
    this.carId= this.route.snapshot.paramMap.get('carId');
    this.form = this.formBuilder.group({
      // Define form controls and add Validators as needed
      content: ['', Validators.required],
      heading: ['', Validators.required],
      shortestDescription: ['', Validators.required],
      overAllScore: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    });

    
  }
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }
  get f (){
    return this.form.controls
  }
  submit() {
    
    this.submitForm = true 
    let carReview =this.form.getRawValue()
    if (this.form.valid &&this.selectedFile) {
    console.log(carReview);
    const formData = new FormData();
    formData.append('content',carReview.content)
    formData.append('heading',carReview.heading)
    formData.append('shortestDescription',carReview.shortestDescription)
    formData.append('overAllScore',carReview.overAllScore)
    formData.append('image',this.selectedFile,this.selectedFile.name)
    formData.append('carId',this.carId)
    
      // Handle the form submission here
      console.log('Form submitted successfully!');
      console.log(formData.append,"ffff");
      
      this.reviewerApi.addCarReview(formData).subscribe(()=> {
        this.toastr.success('form submitted','Successfully', { progressBar: true });
        this.router.navigate(['/reviewer/reviewManagement'])
      },(err)=>{
        this.toastr.error(err.error.message ,'', {progressBar: true})
        
      })
    } else if(this.selectedFile == null){
       this.ImageFieldError=true
      
    }
  }
}
