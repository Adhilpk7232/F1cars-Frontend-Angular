import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  userData:any; 
  showProfile!:boolean;
  subscribe!:boolean
  reviewerId!:string;

  constructor(
    private userApi:UserServiceService,
    private router:Router,
    private loaderService:LoaderserviceService
    ){}
    selectedItem:string='Update User Details';
  ngOnInit(): void {
    this.loaderService.showLoader();

    // Simulate an API request
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 1000);

    this.userApi.getUserDetails().subscribe((res:any) =>{
      this.userData  = res
      if(this.userData.image == null){
        this.showProfile = false
      }else{
        this.showProfile = true
      }
      // console.log(this.userData,"userdata");
      
    },(err) => { 
      console.log(err.error.message,"error from userdat fetching");
      this.router.navigate(['/'])
      
    })
    // console.log(this.showProfile,"hu");
    
  }
  receiveMessage(message: string) {
    this.reviewerId = message;
  }
  selectItem(item:string){
    if(item == 'Chat'){
      this.userApi.checkPlanExist().subscribe((res:any) => {
        if(res.message ='success'){
          this.subscribe = true
        }else{
          this.subscribe = false
        }
      })
    }
    this.selectedItem=item
  }
  logout() {
    console.log("logouted");
    this.userApi.logout().subscribe(
      (res: any) => {
        this.userApi.removeToken();
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err.error.message, "error");
      }
    );
  }
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const fileNameElement = inputElement.nextElementSibling as HTMLElement;

    const file = inputElement.files?.[0];
    const fileName = file?.name || 'No file chosen';
    // fileNameElement.textContent = fileName;
    
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.userApi.updateProfile(formData).subscribe(
        (response: any) => {
          this.ngOnInit()
        },
        (error: any) => {
          console.log(error);
          this.ngOnInit()
        }
      );
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
