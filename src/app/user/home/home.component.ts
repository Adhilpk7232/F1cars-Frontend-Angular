import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse';
import { BrandModel } from 'src/app/models/brandModel';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { getfilterDataRes } from 'src/app/models/getFilterDataRes';
import { CarReview } from 'src/app/models/reviewModel';
import { SubscriptionPlan } from 'src/app/models/subscriptionPlan';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

declare const Razorpay: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loading:boolean = true
  paymentId!:String;
  paymentStatus!:String;

  showLoader: boolean = false; // Define showLoader property

  popularCars:CarBrand[]=[]
  justLaunched:CarBrand[]=[]
  upcommingCars:CarBrand[]=[]

  filterData!:getfilterDataRes;
  uniqueBodyTypes:string[] = [];
  uniqueTransmissions:string[] = [];
  uniqueFuelTypes:string[] = [];
  uniqueSeatCapacities:string[] = [];

  reviews:CarReview[]=[]

  brand:BrandModel[]=[]
  plans:SubscriptionPlan[]=[]

  // SinglePlan:any;
  selectedPlan: string = '';
  selectedCategory:String='BUDGET';
  userLogged!:boolean;
  planData:any;
  searchText!:string;
  cars:CarBrand[]=[]
  searched!:boolean;
  constructor(private userApi:UserServiceService ,private router:Router,private loaderService:LoaderserviceService){
    // Subscribe to navigation events to disable the loader when navigation is complete
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLoader = false;
      }
    });
  }

  
  selectedItem:string='POPULAR';
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1300);
    this.loading = false;
    // this.selectCategory = 'BUDGET'
    this.getPlan()
    this.getBrand()
    this.getPopularCars()
    this.getReviews()
    this.getFilterData()
    this.getCars()
    this.userLogged = this.isuserLoggeIn()
   
    this.userApi.getJustLaunched().subscribe((res:CarBrand[])=>{
      this.justLaunched =res
      console.log(res),"JUST";
      
    },(err)=>{
      console.log(err.error.message);
      
    })
    this.userApi.getUpcommingCars().subscribe((res:CarBrand[])=>{
      this.upcommingCars =res
      console.log(res,"UPCOMMING");
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  getBrand(){
    this.userApi.getBrands().subscribe((res:BrandModel[])=> {
      this.brand = res
      console.log(res);
      
    },(error) => {
      console.log(error.error.message,"error on fetching brands");
      
    })
  }
  getPlan(){
    this.userApi.getplans().subscribe((res:SubscriptionPlan[])=> {
      this.plans = res
    })
  }
  getPopularCars(){
    this.userApi.getPopularCars().subscribe((res:CarBrand[])=>{
      this.popularCars =res
      console.log(res,"POPULAR");
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  getReviews(){
    console.log("call al reviewes");
    
    this.userApi.getAllreviews().subscribe((res:CarReview[])=>{
      this.reviews =res
      console.log(res,"all reviewes");
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }

  selectItem(item:string){
    this.selectedItem=item
  }
  selectCategory(category:string){
    this.selectedCategory=category
  }

  selectPlan(plan: string): void {
    this.userApi.findPlan(plan).subscribe((res:SubscriptionPlan) => {
      this.planData = res;
    },(err) =>{
      console.log("Somthing wrong")
    })
    this.selectedPlan = plan;

  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
  isuserLoggeIn():boolean{
    const loggged =  localStorage.getItem('jwtToken')
    if(loggged == null){
      return false
    }else{
      return true
    }
    
  }
  enableLoader() {
    this.showLoader = true;
  }
  getFilterData(){
    this.userApi.getFilterData().subscribe((res:getfilterDataRes) =>{
      this.filterData =  res
      // console.log(this.filterData,"filterData");
      this.uniqueBodyTypes= res.uniqueBodyTypes
      this.uniqueTransmissions= res.uniqueTransmissions
      this.uniqueFuelTypes= res.uniqueFuelTypes
      this.uniqueSeatCapacities= res.uniqueSeatCapacities
      
    })
  }
  getCars(){
    this.userApi.getAllCars().subscribe((res:CarBrand[])=>{
      this.cars = res
      console.log(this.cars,"all cars goted");
      
    })
  }
  searchCars(){
    console.log("clicked");
    
    this.searched = !this.searched
  }
}
