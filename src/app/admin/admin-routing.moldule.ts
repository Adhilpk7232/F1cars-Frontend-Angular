import {Component, NgModule} from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminDealerListComponent } from './admin-dealer-list/admin-dealer-list.component';
import { AdminDealerAddComponent } from './admin-dealer-add/admin-dealer-add.component';
import { AdminDealerEditComponent } from './admin-dealer-edit/admin-dealer-edit.component';
import { AdminReviewerListComponent } from './admin-reviewer-list/admin-reviewer-list.component';
import { AdminReviewerAddComponent } from './admin-reviewer-add/admin-reviewer-add.component';
import { AdminReviewerEditComponent } from './admin-reviewer-edit/admin-reviewer-edit.component';


const routes:Routes = [
    {path:'',component:AdminLoginComponent},
    {path:'adminHome',component:AdminDashboardComponent},
    {path:'adminUserManagement',component:AdminUserListComponent},
    {path:'adminUserEdit/:userId',component:AdminUserEditComponent},
    {path:'adminReviewManagement',component:AdminReviewerListComponent},
    {path:'adminReviewAdd',component:AdminReviewerAddComponent},
    {path:'adminReviewEdit/:userId',component:AdminReviewerEditComponent},
    {path:'adminDealerManagement',component:AdminDealerListComponent},
    {path:'adminDealerAdd',component:AdminDealerAddComponent},
    {path:'adminDealerEdit/:userId',component:AdminDealerEditComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class AdminRoutingModule { }