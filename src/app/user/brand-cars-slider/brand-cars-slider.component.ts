import { Component,OnInit,Input } from '@angular/core';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-brand-cars-slider',
  templateUrl: './brand-cars-slider.component.html',
  styleUrls: ['./brand-cars-slider.component.css']
})
export class BrandCarsSliderComponent implements OnInit {

  @Input()BrandCars:CarBrand[]=[]

  constructor(
    private userApi:UserServiceService
  ){}
  ngOnInit(): void {
    console.log(this.BrandCars,"car of same brand");
    
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
