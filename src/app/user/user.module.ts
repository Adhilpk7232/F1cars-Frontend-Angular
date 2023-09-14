import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
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

import { PopularCarsComponent } from './featuredCars/popular-cars/popular-cars.component';
import { JustLaunchedCarsComponent } from './featuredCars/just-launched-cars/just-launched-cars.component';
import { UpCommingCarsComponent } from './featuredCars/up-comming-cars/up-comming-cars.component';
import { BrandListingComponent } from './brand-listing/brand-listing.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { WishlistviewComponent } from './wishlist/wishlistview/wishlistview.component';
import { SubcriptionComponent } from './profile/subcription/subcription.component';
import { UserUpdateComponent } from './profile/user-update/user-update.component';
import { CarSinglePageComponent } from './car-single-page/car-single-page.component';
import { BrandCarlistingComponent } from './brand-carlisting/brand-carlisting.component';
import { ReviewSliderComponent } from './review-slider/review-slider.component';
import { ReviewSinglePageComponent } from './review-single-page/review-single-page.component';
import { FooterComponent } from './footer/footer.component';
import { CompareMainPageComponent } from './compareCar/compare-main-page/compare-main-page.component';
import { ChatReviewListComponent } from './profile/chat/chat-review-list/chat-review-list.component';
import { BudgetComponent } from './filter/budget/budget.component';
import { BodyTypeComponent } from './filter/body-type/body-type.component';
import { FuelTypeComponent } from './filter/fuel-type/fuel-type.component';
import { TransmissionComponent } from './filter/transmission/transmission.component';
import { SeatCapcityComponent } from './filter/seat-capcity/seat-capcity.component';
// import { SharedModule } from '../shared/shared.module';
import { SelectCarComponent } from './compareCar/select-car/select-car.component';
// import { LakhconvertorPipe } from '../pipes/lakhpipe/lakhconvertor.pipe';
// import { SearchPipe } from '../pipes/searchPipe/search.pipe';
import { CarSearchPipePipe } from '../pipes/searchPipe/car-search-pipe.pipe';
import { CarPricePipePipe } from '../pipes/carPrice/car-price-pipe.pipe';
import { CarPageComponent } from './car-page/car-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowMoreTextComponent } from './show-more-text/show-more-text.component';
import { ShowMoreFilterModalComponent } from './show-more-filter-modal/show-more-filter-modal.component';
import { ChatPageComponent } from './profile/chat/chat-page/chat-page.component';
import { CalculateTaxPipe } from '../pipes/taxprice/calculate-tax.pipe';
import { OtherBrandsComponent } from './other-brands/other-brands.component';
import { BrandCarsSliderComponent } from './brand-cars-slider/brand-cars-slider.component';
import { ChatSearchPipePipe } from '../pipes/chatSearch/chat-search-pipe.pipe';
import { HomeFileredCarsComponent } from './home-filered-cars/home-filered-cars.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    NavbarComponent,
    HomeComponent,
    ForgetEmailComponent,
    ForgetOtpComponent,
    NewPasswordComponent,
    PopularCarsComponent,
    JustLaunchedCarsComponent,
    UpCommingCarsComponent,
    BrandListingComponent,
    LoaderComponent,
    ProfilePageComponent,
    WishlistviewComponent,
    SubcriptionComponent,
    UserUpdateComponent,
    CarSinglePageComponent,
    BrandCarlistingComponent,
    ReviewSliderComponent,
    ReviewSinglePageComponent,
    FooterComponent,
    CompareMainPageComponent,
    ChatReviewListComponent,
    BudgetComponent,
    BodyTypeComponent,
    FuelTypeComponent,
    TransmissionComponent,
    SeatCapcityComponent,
    SelectCarComponent,
    CarPricePipePipe,
    CarSearchPipePipe,
    CarPageComponent,
    ReviewPageComponent,
    ShowMoreTextComponent,
    ShowMoreFilterModalComponent,
    ChatPageComponent,
    CalculateTaxPipe,
    OtherBrandsComponent,
    BrandCarsSliderComponent,
    ChatSearchPipePipe,
    HomeFileredCarsComponent
  ],
  imports: [
    // SharedModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UserModule { }
