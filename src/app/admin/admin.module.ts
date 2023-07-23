import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminReviewerListComponent } from './admin-reviewer-list/admin-reviewer-list.component';
import { AdminReviewerAddComponent } from './admin-reviewer-add/admin-reviewer-add.component';
import { AdminReviewerEditComponent } from './admin-reviewer-edit/admin-reviewer-edit.component';
import { AdminDealerListComponent } from './admin-dealer-list/admin-dealer-list.component';
import { AdminDealerAddComponent } from './admin-dealer-add/admin-dealer-add.component';
import { AdminDealerEditComponent } from './admin-dealer-edit/admin-dealer-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.moldule';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminNavComponent,
    AdminSideBarComponent,
    AdminUserListComponent,
    AdminUserEditComponent,
    AdminDashboardComponent,
    AdminReviewerListComponent,
    AdminReviewerAddComponent,
    AdminReviewerEditComponent,
    AdminDealerListComponent,
    AdminDealerAddComponent,
    AdminDealerEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule
  ]
})
export class AdminModule { } 
