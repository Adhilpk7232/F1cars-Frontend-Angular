import { Component,NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { OtpComponent } from './otp/otp.component'
import { ForgetEmailComponent } from './forgetPassword/forget-email/forget-email.component'
import { ForgetOtpComponent } from './forgetPassword/forget-otp/forget-otp.component'

const routes:Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'otp',component:OtpComponent},
    {path:'forgetPassword',component:ForgetEmailComponent},
    {path:'forgetOTP',component:ForgetOtpComponent},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }