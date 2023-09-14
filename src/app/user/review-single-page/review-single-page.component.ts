import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { log } from 'console';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-review-single-page',
  templateUrl: './review-single-page.component.html',
  styleUrls: ['./review-single-page.component.css']
})
export class ReviewSinglePageComponent implements OnInit{

  reviewId!:string|null;
  reviewData:any;
  reviewContent!:string
  htmlContent!: SafeHtml;
  selectedSlider!:string;
  brandId!:string;
  brandCars:CarBrand[]=[];
  otherBrands:any[]=[]
  BrandName!:string;
  constructor(
    private route: ActivatedRoute,
    private userApi:UserServiceService,
    private sanitizer: DomSanitizer,
    private loaderService:LoaderserviceService
    ){}
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    this.selectedSlider = 'RELATED CARS'
    this.reviewId = this.route.snapshot.paramMap.get('reviewId');
    
    this.getSingleReview()
    
  }
  getSingleReview(){
    this.userApi.getSingleReview(this.reviewId).subscribe((res:any) => { 
      this.reviewData = res    
      this.reviewContent = res.content
      this.brandId = res.carId.brand
      this.BrandName = res.carId.brand.brand
      // console.log(this.BrandName,"brandName");
      
      console.log(this.brandId,"get brand Id");
      
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.reviewContent);
      this.getCarOfSameBrand(this.brandId)
      
    },(err) => { 
      console.log(err.error.message);
      
    })
  }
  getCarOfSameBrand(brandId:string){
    console.log("hello");
    
    this.userApi.getCarsOfBrand(brandId).subscribe((res:CarBrand[]) => {
      this.brandCars = res
      
      console.log(res,"get same brands cars ");
      this.getOtherBrand(brandId)
      
    },(err) =>{
      console.log(err.error.messaeg);
      
    })
  }
  selectSlider(slider:string){
    this.selectedSlider = slider

  }
  selectedBrand(brandId:string){

  }
  getOtherBrand(brandId:string){
    console.log('get Other brands');
    
    this.userApi.getOtherBrands(brandId).subscribe((res:any)=>{
      this.otherBrands = res
      console.log(res,"other brands");
      
    },(err) =>{
      console.log(err.error.message);
      
    })
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
