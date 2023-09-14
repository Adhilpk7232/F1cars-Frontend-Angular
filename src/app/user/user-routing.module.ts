import { Component,NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { OtpComponent } from './otp/otp.component'
import { ForgetEmailComponent } from './forgetPassword/forget-email/forget-email.component'
import { ForgetOtpComponent } from './forgetPassword/forget-otp/forget-otp.component'
import { NewPasswordComponent } from './forgetPassword/new-password/new-password.component'
import { PopularCarsComponent } from './featuredCars/popular-cars/popular-cars.component'
import { JustLaunchedCarsComponent } from './featuredCars/just-launched-cars/just-launched-cars.component'
import { BrandListingComponent } from './brand-listing/brand-listing.component'
import { ProfilePageComponent } from './profile/profile-page/profile-page.component'
import { WishlistviewComponent } from './wishlist/wishlistview/wishlistview.component'
import { CarSinglePageComponent } from './car-single-page/car-single-page.component'
import { BrandCarlistingComponent } from './brand-carlisting/brand-carlisting.component'
import { ReviewSinglePageComponent } from './review-single-page/review-single-page.component'
import { CompareMainPageComponent } from './compareCar/compare-main-page/compare-main-page.component'
import { UserGuardGuard,ConsecutiveGuard } from '../routeGuard/user/user-guard.guard'
import { CarPageComponent } from './car-page/car-page.component'
import { ReviewPageComponent } from './review-page/review-page.component'
import { ChatPageComponent } from './profile/chat/chat-page/chat-page.component'
import { HomeFileredCarsComponent } from './home-filered-cars/home-filered-cars.component'

const routes:Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'otp',component:OtpComponent},
    {path:'forgetPassword',component:ForgetEmailComponent},
    {path:'forgetOTP',component:ForgetOtpComponent},
    {path:'resetPassword',component:NewPasswordComponent},
    {path:'profile',component:ProfilePageComponent},
    {path:'popular',component:PopularCarsComponent},
    {path:'just',component:JustLaunchedCarsComponent},
    {path:'wishlist',component:WishlistviewComponent},
    {path:'carSinglePage/:carId',component:CarSinglePageComponent},
    {path:'brandCars/:brandId',component:BrandCarlistingComponent},
    {path:'reviewSinglePage/:reviewId',component:ReviewSinglePageComponent},
    {path:'comparePage',component:CompareMainPageComponent},
    {path:'carPage',component:CarPageComponent},
    {path:'reviewPage',component:ReviewPageComponent},
    {path:'chatPage/:reviewerId',component:ChatPageComponent},
    {path:'filteredcars',component:HomeFileredCarsComponent}
















];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }