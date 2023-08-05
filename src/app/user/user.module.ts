import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserRoutingModule} from './user-routing.module'
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { ForgetEmailComponent } from './forgetPassword/forget-email/forget-email.component';
import { ForgetOtpComponent } from './forgetPassword/forget-otp/forget-otp.component';
import { NewPasswordComponent } from './forgetPassword/new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    NavbarComponent,
    HomeComponent,
    ForgetEmailComponent,
    ForgetOtpComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class UserModule { }
