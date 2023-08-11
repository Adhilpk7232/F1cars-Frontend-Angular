import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-brand-listing',
  templateUrl: './brand-listing.component.html',
  styleUrls: ['./brand-listing.component.css']
})
export class BrandListingComponent implements OnInit{
  @Input()BrandData:any[]=[]
  showMoreBrand:boolean = false
  
  constructor(){}
  ngOnInit(): void {
    console.log(this.BrandData,"listing brands");
    
  }

  readmore(){
    this.showMoreBrand = !this.showMoreBrand
  }
}
