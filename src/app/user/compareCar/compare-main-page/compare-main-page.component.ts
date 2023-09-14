import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-compare-main-page',
  templateUrl: './compare-main-page.component.html',
  styleUrls: ['./compare-main-page.component.css']
})
export class CompareMainPageComponent implements OnInit{

  selectedCategory!:String;
  showVersion:boolean=false
  showComapreData:boolean = false
  brandsForSelection:any[]=[]
  CarsForSelection:any[]=[]
  selectedCar1:any;
  selectedcars:any[]=[]
  versions:any[]=[]
  showMore:boolean = false
  constructor(
    private loaderService:LoaderserviceService,
    private userApi:UserServiceService,
    private toastr:ToastrService
    ){}

  ngOnInit(): void {
    
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
  }
  selectCategory(category:string){
    this.selectedCategory=category
  }
  readmore(){
    this.showMore = !this.showMore
    console.log(this.showMore);
    
  }
  selectCar(){
    this.userApi.getComapreBrands().subscribe((res:any) =>{
      this.brandsForSelection = res
    })
  }
  showSelectionCar(brandId:string){
    this.userApi.getComapreCars(brandId).subscribe((res:any) =>{
      this.CarsForSelection = res
    })
  }
  selectedCarForCompare(car:any){
    this.selectedCar1= car
  }
  showSelectedVersions(carId:string){
    this.showVersion = !this.showVersion
    this.userApi.getComapreVersions(carId).subscribe((res:any) =>{
      this.versions = res
    }
    )
  }
  toggleSelectedcars(item:any[],selectedcarsArray:any[]=[]){
    const index = selectedcarsArray.indexOf(item);
    if (index !== -1) {
      selectedcarsArray.splice(index, 1);
    } else {
      selectedcarsArray.push(item);
    }
    console.log(selectedcarsArray,"selected arry");
    
  }
  toggleSelecteditems(item: any[]) {
    this.toggleSelectedcars(item, this.selectedcars);
  }
  removeSelectedCar(index:number){
    console.log(index);
    this.selectedcars.splice(index, 1);
  }
  comapreButton(){
    if(this.selectedcars.length == 0){
      this.toastr.error(' Selected two cars for comparison!', 'Comparison Notification');
    }
    else if(this.selectedcars.length <2){
      this.toastr.error(' Selected a cars for comparison!', 'Comparison Notification');
    }else{
      this.showComapreData = true
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
