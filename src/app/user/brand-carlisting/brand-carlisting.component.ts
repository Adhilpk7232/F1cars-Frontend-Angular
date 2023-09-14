import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { carModel } from 'src/app/models/carModel';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-brand-carlisting',
  templateUrl: './brand-carlisting.component.html',
  styleUrls: ['./brand-carlisting.component.css']
})
export class BrandCarlistingComponent implements OnInit{
  brandId!:string|null;
  carData:carModel[]=[]
constructor(private route: ActivatedRoute,private userApi:UserServiceService,private loaderService:LoaderserviceService){}
ngOnInit(): void {
  this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
  this.brandId = this.route.snapshot.paramMap.get('brandId');
  this.getCarsOfBrand(this.brandId)
}
getCarsOfBrand(brandId:string|null):void{
  if(brandId == null){
    return 
  }else{
    this.userApi.getCarsOfBrand(brandId).subscribe((res:carModel[]) => { 
      this.carData = res
      console.log(res,"brnadCars");
      
    },(err) => {
      console.log(err.error.message);
      
    })
  }
  
}
getImageUrl(image: string) {
  if(image){
    return this.userApi.loadimage(image);
  }else {
    return null
  }
}

}
