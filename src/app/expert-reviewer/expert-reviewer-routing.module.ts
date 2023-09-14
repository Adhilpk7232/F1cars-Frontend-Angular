import {Component, NgModule} from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReviewManagementComponent } from './review-management/review-management.component';
import { ReviewBrandShowComponent } from './addReview/review-brand-show/review-brand-show.component';
import { ReviewCarShowComponent } from './addReview/review-car-show/review-car-show.component';
import { ReviewFormComponent } from './addReview/review-form/review-form.component';
import { EditCarReviewComponent } from './edit-car-review/edit-car-review.component';
import { CarReviewPreviewComponent } from './car-review-preview/car-review-preview.component';
import { ReviewerChatComponent } from './reviewer-chat/reviewer-chat.component';

const routes:Routes = [
    {path:'',component:LoginComponent},
  {path:'reviewerHome',component:ReviewManagementComponent},
  {path:'reviewerAddReviewBrand',component:ReviewBrandShowComponent},
  {path:'reviewerAddReviewCar/:brandId',component:ReviewCarShowComponent},
  {path:'reviewerAddReviewForm/:carId',component:ReviewFormComponent},
  {path:'reviewManagement',component:ReviewManagementComponent},
  {path:'carReviewUpdate/:reviewId',component:EditCarReviewComponent},
  {path:'carReviewPreview/:reviewId',component:CarReviewPreviewComponent},
  {path:'chat',component:ReviewerChatComponent}



    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class ReviewerRoutingModule { }