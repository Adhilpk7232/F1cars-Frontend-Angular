import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';

@Component({
  selector: 'app-edit-car-review',
  templateUrl: './edit-car-review.component.html',
  styleUrls: ['./edit-car-review.component.css']
})
export class EditCarReviewComponent implements OnInit{

  
  form!: FormGroup;
  htmlContent='';
  headingReview=''
  shortestDescriptionReview=''
  overAllScoreReview=''
  revieweId:any;
  selectedFile:any|File=null;
  reviewData:any;
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
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private route:ActivatedRoute, private reviewerApi:ReviewerServiceService){}
  ngOnInit(): void {
    this.revieweId= this.route.snapshot.paramMap.get('reviewId');
    this.reviewerApi.getCarReviewDeatilsForUpdate(this.revieweId).subscribe((res:any)=> { 
      this.reviewData = res
      this.htmlContent = res.content
      this.headingReview=res.heading
      this.shortestDescriptionReview=res.shortestDescription
      this.overAllScoreReview=res.overAllScore
      console.log(res,"reviewData");
      
    },(error)=> { 
      console.log(error.error.message);
      
    })
    this.form = this.formBuilder.group({
      // Define form controls and add Validators as needed
      content: ['', Validators.required],
      heading: ['', Validators.required],
      shortestDescription: ['', Validators.required],
      overAllScore: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });

    
  }
  // onFileSelected(event:any){
  //   this.selectedFile=<File>event.target.files[0]
  // }
  submit() {
    let carReview =this.form.getRawValue()
    console.log(carReview,"formData");
    const formData = new FormData();
    formData.append('content',carReview.content)
    formData.append('heading',carReview.heading)
    formData.append('shortestDescription',carReview.shortestDescription)
    formData.append('overAllScore',carReview.overAllScore)
    // formData.append('image',this.selectedFile,this.selectedFile.name)
    // formData.append('carId',this.revieweId)


    if (this.form.valid) {
      // Handle the form submission here
      console.log('Form submitted successfully!');
      console.log(formData.append,"ffff");
      
      this.http.post(`http://localhost:5000/reviewer/updateReview/${this.revieweId}`,carReview,{
        withCredentials: true
      }).subscribe(()=> this.router.navigate(['/reviewer/reviewManagement']),(err)=>{
        this.router.navigate(['/reviewer/reviewerHome'])
      })
    } else {
      // The form is invalid, do something (e.g., show error messages)
    }
  }
}
