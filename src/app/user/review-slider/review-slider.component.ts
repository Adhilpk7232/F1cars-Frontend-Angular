import { Component, OnInit, ViewChild, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-review-slider',
  templateUrl: './review-slider.component.html',
  styleUrls: ['./review-slider.component.css']
})
export class ReviewSliderComponent implements OnInit,AfterViewInit{

  

  @Input('reviews')
  reviewData:any[] =[];
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
    this.userApi.getAllreviews().subscribe((res:any)=>{
      this.reviewData =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
   console.log(this.reviewData,"init");
   console.log(this.sliderContainer,"i");
  }
  ngAfterViewInit():void{
    console.log(this.reviewData,"after");
    
   this.setUpSlider()
    

  }


  getAllReview(){
    this.userApi.getAllreviews().subscribe((res:any)=>{
      this.reviewData = res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  

  setUpSlider(){
    let container = this.sliderContainer.nativeElement as HTMLElement;
    this.sliderContainterWidth = container.clientWidth
    this.slideWidth = this.sliderContainterWidth/this.elementsToShow
    this.sliderWidth = this.slideWidth*this.reviewData.length

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
    const temp = this.reviewData.length-this.elementsToShow
    const temp1=-(temp*this.slideWidth)
    if(this.sliderMarginLeft<=temp1){
      return
    }
    console.log("clicked next");
    
    this.sliderMarginLeft = this.sliderMarginLeft-this.slideWidth
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
  
}
