import { Component ,OnInit} from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
// import { User } from '../../userModel/user.model';

@Component({
  selector: 'app-wishlistview',
  templateUrl: './wishlistview.component.html',
  styleUrls: ['./wishlistview.component.css']
})
export class WishlistviewComponent implements OnInit{

  UserData:any[]=[]
  item!:boolean;
  constructor(
    private userApi:UserServiceService,
    private toastr:ToastrService,
    private loaderService:LoaderserviceService
    ){}
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);
    this.getWishlist()
  }
  getWishlist(){
    this.userApi.getWishlist().subscribe((res:any) => {
      this.UserData=res.wishlist
      console.log(this.UserData,"dat");
      
      if(res.wishlist.length){
        this.item=true
      }else{
        this.item=false
      }
      console.log(this.UserData,"userData");
      
    },(err) => { 
      console.log(err.error.message);
      
    })
  }
  addWishlist(carId:string){
    
    this.userApi.addWishlist(carId).subscribe((res:any) => { 
      this.toastr.success('Item removed from wishlist!', 'Success');
      this.ngOnInit()
    },(err) => { 
      this.toastr.error('Failed to remove item from wishlist.', 'Error');
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
