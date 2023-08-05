import {Component, NgModule} from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserListComponent } from './userManagement/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './userManagement/admin-user-edit/admin-user-edit.component';
import { AdminBrandListComponent } from './brandManagement/admin-brand-list/admin-brand-list.component';
import { AdminBrandAddComponent } from './brandManagement/admin-brand-add/admin-brand-add.component';
import { AdminBrandEditComponent } from './brandManagement/admin-brand-edit/admin-brand-edit.component';
import { AdminCarListComponent } from './carManagement/admin-car-list/admin-car-list.component';
import { AdminCarAddComponent } from './carManagement/admin-car-add/admin-car-add.component';
import { AdminCarEditComponent } from './carManagement/admin-car-edit/admin-car-edit.component';
import { CarReviewManagementComponent } from './car-review-management/car-review-management.component';
import { AdminDealerAddComponent } from './dealerManagement/admin-dealer-add/admin-dealer-add.component';
import { AdminDealerEditComponent } from './dealerManagement/admin-dealer-edit/admin-dealer-edit.component';
import { AdminDealerListComponent } from './dealerManagement/admin-dealer-list/admin-dealer-list.component';
import { AdminReviewerListComponent } from './reviewManagement/admin-reviewer-list/admin-reviewer-list.component';
import { AdminReviewerEditComponent } from './reviewManagement/admin-reviewer-edit/admin-reviewer-edit.component';
import { AdminReviewerAddComponent } from './reviewManagement/admin-reviewer-add/admin-reviewer-add.component';


const routes:Routes = [
    
    {path:'',component:AdminLoginComponent},
    {path:'adminHome',component:AdminDashboardComponent},
    {path:'adminDashboard',component:AdminDashboardComponent},
    {path:'adminUserManagement',component:AdminUserListComponent},
    {path:'editUser/:userId',component:AdminUserEditComponent},
    {path:'adminExpertReviewerManagement',component:AdminReviewerListComponent},
    {path:'editReviewer/:reviewerId',component:AdminReviewerEditComponent},
    {path:'createReviewer',component:AdminReviewerAddComponent},
    {path:'adminDealerManagement',component:AdminDealerListComponent},
    {path:'editDealerDetails/:userId',component:AdminDealerEditComponent},
    {path:'createDealer',component:AdminDealerAddComponent},
    {path:'adminBrand',component:AdminBrandListComponent},
    {path:'adminAddBrand',component:AdminBrandAddComponent},
    {path:'adminEditBrand/:brandId',component:AdminBrandEditComponent},
    {path:'adminCar',component:AdminCarListComponent},
    {path:'adminAddCar',component:AdminCarAddComponent},
    {path:'adminEditcar/:carId',component:AdminCarEditComponent},
    {path:'adminReviewManagement',component:CarReviewManagementComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class AdminRoutingModule { }