import { Component, OnInit, ViewChild, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-up-comming-cars',
  templateUrl: './up-comming-cars.component.html',
  styleUrls: ['./up-comming-cars.component.css']
})
export class UpCommingCarsComponent implements OnInit,AfterViewInit{

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

  constructor(
    private userApi:UserServiceService,
    private router:Router ){}
  ngOnInit(): void {
    this.checkUserLogin()
    this.getUpcommingrcars()
   console.log(this.popularCars,"init");
   console.log(this.sliderContainer,"i");
  }
  ngAfterViewInit():void{
    console.log(this.popularCars,"after");
    
   this.setUpSlider()
    

  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }

  getUpcommingrcars(){
    this.userApi.getUpcommingCars().subscribe((res:CarBrand[])=>{
      this.popularCars = res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  updateUpcommingCars() {
    this.getUpcommingrcars();
    console.log(this.popularCars, "update");
  }

  setUpSlider(){
    let container = this.sliderContainer.nativeElement as HTMLElement;
    this.sliderContainterWidth = container.clientWidth
    this.slideWidth = this.sliderContainterWidth/this.elementsToShow
    this.sliderWidth = this.slideWidth*this.popularCars.length

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
    const temp = this.popularCars.length-this.elementsToShow
    const temp1=-(temp*this.slideWidth)
    if(this.sliderMarginLeft<=temp1){
      return
    }
    console.log("clicked next");
    
    this.sliderMarginLeft = this.sliderMarginLeft-this.slideWidth
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
