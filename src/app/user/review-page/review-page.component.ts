import { Component ,OnInit} from '@angular/core';
import { CarReview } from 'src/app/models/reviewModel';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit{

  allReview:CarReview[]=[]
  page:number=1
  count:number=0
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]

  constructor(
    private userApi:UserServiceService,
    private loaderService:LoaderserviceService
  ){}

  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    this.getAllReview()
  }
  getAllReview(){
    this.userApi.getAllreviews().subscribe((res:CarReview[]) => {
      this.allReview = res
    })
  }
  onTableDataChange(event:any){
    this.page=event
    this.getAllReview()
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }

}
