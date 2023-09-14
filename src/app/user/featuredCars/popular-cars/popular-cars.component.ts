import { Component, OnInit, ViewChild, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { addWishlistApi } from 'src/app/models/addWishlistRes';

@Component({
  selector: 'app-popular-cars',
  templateUrl: './popular-cars.component.html',
  styleUrls: ['./popular-cars.component.css'],

})
export class PopularCarsComponent implements OnInit,AfterViewInit{
  @Input('popularCars')
  popularCars:CarBrand[] =[];

  @ViewChild('sliderContainer')
  sliderContainer!:ElementRef;
  sliderContainterWidth=0;
  slideWidth=0;
  elementsToShow = 3;
  sliderWidth=0
  sliderMarginLeft = 0
  userLogin!: boolean;
  userData!:any;

  isInWishlist!: boolean;
  constructor(
    private userApi:UserServiceService,
    private toastr:ToastrService,
    private router:Router ){}
  ngOnInit(): void {
    this.checkUserLogin()
    this.userApi.getPopularCars().subscribe((res:CarBrand[])=>{
      this.popularCars =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  ngAfterViewInit():void{
   this.setUpSlider()
    

  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }

  getpopularcars(){
    this.userApi.getPopularCars().subscribe((res:CarBrand[])=>{
      this.popularCars = res
      console.log(res);
      
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }

  setUpSlider(){
    let container = this.sliderContainer.nativeElement as HTMLElement;
    this.sliderContainterWidth = container.clientWidth
    if(this.sliderContainterWidth <= 640 && this.sliderContainterWidth > 352){
      console.log("hello fron if case");
      
      this.elementsToShow = 2
    }
    else if(this.sliderContainterWidth <= 352){
      this.elementsToShow = 1
    }
    console.log(this.elementsToShow,"updated");
    
    this.slideWidth = this.sliderContainterWidth/this.elementsToShow
    this.sliderWidth = this.slideWidth*this.popularCars.length

    console.log( this.sliderContainterWidth,"containerwidth");
    console.log(this.sliderWidth,"sliderwidth");
    console.log(this.slideWidth,"slidewidth");
   

    

  }
  prev(){
    console.log(this.sliderMarginLeft,"margin");
    
    if(this.sliderMarginLeft ===0||this.sliderMarginLeft>0||this.sliderMarginLeft>-2){
      return
    }
    this.sliderMarginLeft = this.sliderMarginLeft+this.slideWidth
  }

  next(){
    const temp = this.popularCars.length-this.elementsToShow
    const temp1=-(temp*this.slideWidth)
    if(this.sliderMarginLeft<=temp1){
      return
    }
    console.log("clicked next");
    
    this.sliderMarginLeft = this.sliderMarginLeft-this.slideWidth
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
}
