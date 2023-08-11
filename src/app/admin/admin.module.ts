import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserListComponent } from './userManagement/admin-user-list/admin-user-list.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.moldule';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminCarAddComponent } from './carManagement/admin-car-add/admin-car-add.component';
import { AdminCarEditComponent } from './carManagement/admin-car-edit/admin-car-edit.component';
import { AdminCarListComponent } from './carManagement/admin-car-list/admin-car-list.component';
import { AdminUserEditComponent } from './userManagement/admin-user-edit/admin-user-edit.component';
import { CarReviewManagementComponent } from './car-review-management/car-review-management.component';
import { AdminReviewerListComponent } from './reviewManagement/admin-reviewer-list/admin-reviewer-list.component';
import { AdminReviewerEditComponent } from './reviewManagement/admin-reviewer-edit/admin-reviewer-edit.component';
import { AdminReviewerAddComponent } from './reviewManagement/admin-reviewer-add/admin-reviewer-add.component';
import { AdminDealerListComponent } from './dealerManagement/admin-dealer-list/admin-dealer-list.component';
import { AdminDealerEditComponent } from './dealerManagement/admin-dealer-edit/admin-dealer-edit.component';
import { AdminDealerAddComponent } from './dealerManagement/admin-dealer-add/admin-dealer-add.component';
import { AdminBrandListComponent } from './brandManagement/admin-brand-list/admin-brand-list.component';
import { AdminBrandAddComponent } from './brandManagement/admin-brand-add/admin-brand-add.component';
import { AdminBrandEditComponent } from './brandManagement/admin-brand-edit/admin-brand-edit.component';
import { RouterModule } from '@angular/router';
import { AdminOTPComponent } from './admin-otp/admin-otp.component';
import { PlanlistComponent } from './planManagement/planlist/planlist.component';
import { PlanEditComponent } from './planManagement/plan-edit/plan-edit.component';
import { PlanAddComponent } from './planManagement/plan-add/plan-add.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminNavComponent,
    AdminSideBarComponent,
    AdminUserListComponent,
    AdminDashboardComponent,
    AdminCarAddComponent,
    AdminCarEditComponent,
    AdminCarListComponent,
    AdminUserEditComponent,
    CarReviewManagementComponent,
    AdminReviewerListComponent,
    AdminReviewerEditComponent,
    AdminReviewerAddComponent,
    AdminDealerListComponent,
    AdminDealerEditComponent,
    AdminDealerAddComponent,
    AdminBrandListComponent,
    AdminBrandAddComponent,
    AdminBrandEditComponent,
    AdminOTPComponent,
    PlanlistComponent,
    PlanEditComponent,
    PlanAddComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    AngularEditorModule,
  ]
})
export class AdminModule { } 
