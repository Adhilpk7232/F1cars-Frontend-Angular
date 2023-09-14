import { Component,OnInit,Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-other-brands',
  templateUrl: './other-brands.component.html',
  styleUrls: ['./other-brands.component.css']
})
export class OtherBrandsComponent implements OnInit{
  @Input() BrandData:any[]=[]
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
