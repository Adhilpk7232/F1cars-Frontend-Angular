import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { ReviewManagementComponent } from './review-management/review-management.component';
import { ReviewBrandShowComponent } from './addReview/review-brand-show/review-brand-show.component';
import { ReviewCarShowComponent } from './addReview/review-car-show/review-car-show.component';
import { ReviewFormComponent } from './addReview/review-form/review-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewerRoutingModule } from './expert-reviewer-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule } from '@angular/router';
import { EditCarReviewComponent } from './edit-car-review/edit-car-review.component';
import { CarReviewPreviewComponent } from './car-review-preview/car-review-preview.component';
import { ReviewerChatComponent } from './reviewer-chat/reviewer-chat.component';


@NgModule({
  declarations: [
    LoginComponent,
    NavComponent,
    SideBarComponent,
    HomeComponent,
    ReviewManagementComponent,
    ReviewBrandShowComponent,
    ReviewCarShowComponent,
    ReviewFormComponent,
    EditCarReviewComponent,
    CarReviewPreviewComponent,
    ReviewerChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReviewerRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    AngularEditorModule,
  ]
})
export class ExpertReviewerModule { }
