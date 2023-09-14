import { Component , Input,OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Router ,NavigationEnd} from '@angular/router';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input()userLogged!:boolean;

  constructor(private userApi:UserServiceService, private router:Router){
     // Subscribe to navigation events to disable the loader when navigation is complete
     this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLoader = false;
      }
    });
  }

  showDropdown = false;
  user!:Boolean;
  token!:string|null;
  searchText!:string;
  cars:CarBrand[]=[]
  showLoader: boolean = false;
  menuButton:boolean = false
  showSearch:boolean = false
 
  // searchClicked!:boolean
  ngOnInit(): void {
    this.token = this.userApi.getToken()
    if(this.token ==null){
      this.user = false
    }else{
      this.user = true
    }
    this.getCars()
  }
  getCars(){
    this.userApi.getAllCars().subscribe((res:CarBrand[])=>{
      this.cars = res
      console.log(this.cars,"all cars goted");
      
    })
  }
  showMenuList(){
    this.menuButton = !this.menuButton
  }
  showSearchBox(){
    this.showSearch = !this.showSearch
  }
  

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  logout() {
    console.log("logouted");
    
    
    this.userApi.logout().subscribe(
      (res: ApiResponse) => {
        this.userApi.removeToken();
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err.error.message, "error");
      }
    );
  }
  enableLoader() {
    this.showLoader = true;
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
