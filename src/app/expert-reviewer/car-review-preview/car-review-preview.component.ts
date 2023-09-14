import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-car-review-preview',
  templateUrl: './car-review-preview.component.html',
  styleUrls: ['./car-review-preview.component.css']
})
export class CarReviewPreviewComponent implements  OnInit{
  revieweId:any;
  reviewData:any;
  reviewContent!:string
  htmlContent!: SafeHtml;

  constructor(
    private route:ActivatedRoute,
    private reviewerApi:ReviewerServiceService,
    private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.revieweId= this.route.snapshot.paramMap.get('reviewId');

    this.reviewerApi.getCarReviewDeatilsForUpdate(this.revieweId).subscribe((res:any)=> { 
      this.reviewData = res
      this.reviewContent = res.content
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.reviewContent);
      console.log(res,"reviewData");
      
    },(error)=> { 
      console.log(error.error.message);
      
    })
  }

}
