import { Component,OnInit,Input } from '@angular/core';
import { BrandModel } from 'src/app/models/brandModel';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-brand-listing',
  templateUrl: './brand-listing.component.html',
  styleUrls: ['./brand-listing.component.css']
})
export class BrandListingComponent implements OnInit{
  @Input()BrandData:BrandModel[]=[]
  showMoreBrand:boolean = false
  
  constructor(
    private userApi:UserServiceService
  ){}
  ngOnInit(): void {
    console.log(this.BrandData,"listing brands");
    
  }

  readmore(){
    this.showMoreBrand = !this.showMoreBrand
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
