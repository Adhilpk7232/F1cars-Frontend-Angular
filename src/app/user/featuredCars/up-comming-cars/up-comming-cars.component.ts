import { Component, OnInit, ViewChild, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-up-comming-cars',
  templateUrl: './up-comming-cars.component.html',
  styleUrls: ['./up-comming-cars.component.css']
})
export class UpCommingCarsComponent implements OnInit,AfterViewInit{

  @Input('popularCars')
  popularCars:any[] =[];

  @ViewChild('sliderContainer')
  sliderContainer!:ElementRef;
  sliderContainterWidth=0;
  slideWidth=0;
  elementsToShow = 3;
  sliderWidth=0
  sliderMarginLeft = 0

  constructor(
    private userApi:UserServiceService,
    private router:Router ){}
  ngOnInit(): void {
    this.userApi.getUpcommingCars().subscribe((res:any)=>{
      this.popularCars =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
   console.log(this.popularCars,"init");
   console.log(this.sliderContainer,"i");
  }
  ngAfterViewInit():void{
    console.log(this.popularCars,"after");
    
   this.setUpSlider()
    

  }


  getpopularcars(){
    this.userApi.getUpcommingCars().subscribe((res:any)=>{
      this.popularCars = res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  updatePopularCars() {
    this.getpopularcars();
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
}
