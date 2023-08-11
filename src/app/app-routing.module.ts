import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserModule} from '../app/user/user.module'

const routes: Routes = [
  {path:'',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'reviewer',loadChildren:()=>import('./expert-reviewer/expert-reviewer.module').then(m=>m.ExpertReviewerModule)},
  {path:'dealer',loadChildren:()=>import('./dealer/dealer.module').then(m=>m.DealerModule)},
  {path:'**',redirectTo:'/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
