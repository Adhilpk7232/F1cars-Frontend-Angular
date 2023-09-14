import { Component, OnInit ,ViewChild, ElementRef, AfterViewInit ,Input } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { addWishlistApi } from 'src/app/models/addWishlistRes';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-car-single-page',
  templateUrl: './car-single-page.component.html',
  styleUrls: ['./car-single-page.component.css']
})
export class CarSinglePageComponent implements OnInit,AfterViewInit{

  @ViewChild('sliderContainer')
  sliderContainer!:ElementRef;
  sliderContainterWidth=0;
  slideWidth=0;
  elementsToShow = 1;
  sliderWidth=0
  sliderMarginLeft = 0
  statesData:any[]=[]
  userLogin!: boolean;
  userData!:any;

  selectedState: string = ''; // To store the selected state
  
  
  locationMenu: boolean = false;
  placeholder: string = 'Select an Location';

  selectedOption!:string;
  carId!:string|null;
  carData:any;
  colorData:any;
  isDropdownOpen = false;

  

  constructor(
    private route: ActivatedRoute,
    private userApi:UserServiceService,
    private toastr:ToastrService,
    private loaderService:LoaderserviceService,
    private router: Router,
    private elementRef: ElementRef
    ){

      
  }
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 2000);
    this.checkUserLogin()
    this.carId = this.route.snapshot.paramMap.get('carId');
    this.getcarDetails()
    this.getAllStates()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit():void{
    console.log(this.colorData,"after");
    
   this.setUpSlider()
    

  }
  checkUserLogin(){
    if(this.userApi.getToken()){
      this.userLogin = true
      this.getUserData()
      
    }else{
      this.userLogin = false
    }
    console.log(this.userLogin,this.userData,this.userApi.getToken());
    
  }
  getUserData(){
    this.userApi.getUserDetails().subscribe((res:any) =>{
      this.userData = res
    })
  }

  setUpSlider(){
    let container = this.sliderContainer.nativeElement as HTMLElement;
    this.sliderContainterWidth = container.clientWidth
    this.slideWidth = this.sliderContainterWidth/this.elementsToShow
    this.sliderWidth = this.slideWidth*this.colorData.length

    console.log(this.sliderContainterWidth,);
    console.log(this.sliderWidth,);
    console.log(this.slideWidth,);

    

  }
  prev(){
    console.log(this.sliderMarginLeft,"margin");
    
    if(this.sliderMarginLeft ===0||this.sliderMarginLeft>0||this.sliderMarginLeft>-2){
      return
    }
    this.sliderMarginLeft = this.sliderMarginLeft+this.slideWidth
  }

  next(){
    const temp = this.colorData.length-this.elementsToShow
    const temp1=-(temp*this.slideWidth)
    if(this.sliderMarginLeft<=temp1){
      return
    }
    console.log("clicked next");
    
    this.sliderMarginLeft = this.sliderMarginLeft-this.slideWidth
  }

  getcarDetails(){
    this.userApi.getCarDetails(this.carId).subscribe((res:CarBrand) => { 
      console.log( res,"carType");
      // this.basePrice = res.price
      
      this.carData = res
      this.colorData =res.colors
    },(err) => { 
      console.log(err.error.message);
      
    })
  }

  selectOption(item:string){
    this.selectedOption=item
  }

  addWishlist(carId:string){
    
    this.userApi.addWishlist(carId).subscribe((res:addWishlistApi) => { 

      if(res.action == 'add'){
        
        this.toastr.success('Item added from wishlist!', 'Success');
      }else{
        
        this.toastr.success('Item removed from wishlist!', 'Success');
      }
    })
  }

  getAllStates(){
    this.userApi.getStates().subscribe((res:any)=>{
      this.statesData = res.StatesData
    },(err) => { 
      // this.router.navigate(['/admin/adminHome'])
    })
  }
  
  toggleDropdown() {
    this.locationMenu = !this.locationMenu;
  }

  selectLocation(option: string) {
    this.selectedState = option;    
    this.locationMenu = false;
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
