import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { CarBrand } from 'src/app/models/carBrandpopulatedModel';
import { getfilterDataRes } from 'src/app/models/getFilterDataRes';
import { UserDataState } from 'src/app/models/userDataSate';
import { LoaderserviceService } from 'src/app/services/loader/loaderservice.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css']
})
export class CarPageComponent implements OnInit{

  allCars:CarBrand[]=[]
  page:number=1
  count:number=0
  tableSize:number=6;
  tableSizes:any=[5,10,15,20]
  showMore:boolean = false
  Bodymore:boolean = false
  Fuelmore:boolean = false
  Transmissionmore:boolean = false
  seatCapacitymore:boolean = false
  userLogin!: boolean;
  userData!:UserDataState;
  filterData!:getfilterDataRes;
  uniqueBodyTypes:string[] = [];
  uniqueTransmissions:string[] = [];
  uniqueFuelTypes:string[] = [];
  uniqueSeatCapacities:string[] = [];

  currentPage:number = 1;
  pageSize:number = 10
  totalItems:number = 0
  totalPages:number = 0 

  minPrice!:number;
  maxPrice!:number;
  priceOrder:String = '';


  selectedBodyTypes: string[] = [];
  selectedFuelTypes: string[] = [];
  selectedTransmissionTypes: string[] = [];
  selectedSeatCapacities: string[] = [];
  // showLoader: boolean = false;


  constructor(
    private userApi:UserServiceService,
    private router:Router,
    private loaderService: LoaderserviceService
  ){

  }

  ngOnInit(): void {
    // initFlowbite();
    this.loaderService.showLoader();

    // Simulate an asynchronous action (e.g., HTTP request)
    setTimeout(() => {
      // Hide the loader when the action is complete
      this.loaderService.hideLoader();
    }, 1000);
    this.getAllCars()
    this.checkUserLogin()
    this.getFilterData()
  }
  getAllCars(){
    this.applyFilters()
    // this.normalPagination = true
    // const filters = {
    //   page: this.normalcurrentPage,
    //   pageSize: this.normalpageSize
      
    // };
    // console.log(filters.page,"page",filters.pageSize,"size");
    
    // this.userApi.getCarsPage(filters).subscribe((res:any) => { 
    //   this.allCars = res.cars
    //   this.normaltotalItems = res.totalCount;
    //       this.normalcalculateTotalPages();
    //   console.log(res,"allcars");
      
    // },(err) =>{
    //   console.log(err.error.message);
      
    // })
  }
  getFilterData(){
    this.userApi.getFilterData().subscribe((res:getfilterDataRes) =>{
      this.filterData =  res
      // console.log(this.filterData,"filterData");
      this.uniqueBodyTypes= res.uniqueBodyTypes
      this.uniqueTransmissions= res.uniqueTransmissions
      this.uniqueFuelTypes= res.uniqueFuelTypes
      this.uniqueSeatCapacities= res.uniqueSeatCapacities
      
    })
  }

  onPageChange(page: number): void {
    // Handle page change event (e.g., user clicks on a page number)
    this.currentPage = page;
    this.applyFilters();
  }
  checkUserLogin(){
    if(this.userApi.getToken()){
      this.userLogin = true
      this.getUserData()
      
    }else{
      this.userLogin = false
    }
    console.log(this.userLogin,this.userData,this.userApi.getToken());
    
  }
  getUserData(){
    this.userApi.getUserDetails().subscribe((res:UserDataState) =>{
      this.userData = res
      console.log(res,'userDAta');
      
    })
  }

  readmore(){
    this.showMore = !this.showMore
    console.log(this.showMore);
  }
  Bodyreadmore(){
    this.Bodymore = !this.Bodymore
    console.log(this.Bodymore);
  }
  Fuelreadmore(){
    this.Fuelmore = !this.Fuelmore
    console.log(this.Fuelmore) 

  }
  Transmissionreadmore(){
    this.Transmissionmore = !this.Transmissionmore
    console.log(this.Transmissionmore)

  }
  seatCapacityreadmore(){
    this.seatCapacitymore = !this.seatCapacitymore
    console.log(this.seatCapacitymore)
  }

  
  toggleBodyType(item: string) {
    this.toggleSelectedItem(item, this.selectedBodyTypes);
  }

  toggleFuelType(item: string) {
    this.toggleSelectedItem(item, this.selectedFuelTypes);
  }

  toggleTransmissionType(item: string) {
    this.toggleSelectedItem(item, this.selectedTransmissionTypes);
  }

  toggleSeatCapacity(item: string) {
    this.toggleSelectedItem(item, this.selectedSeatCapacities);
  }

  toggleSelectedItem(item: string, selectedItemArray: string[]) {
    const index = selectedItemArray.indexOf(item);
    if (index !== -1) {
      selectedItemArray.splice(index, 1);
    } else {
      selectedItemArray.push(item);
    }
  }

  isItemSelected(item: string, selectedItemArray: string[]): boolean {
    return selectedItemArray.includes(item);
  }
  
  clearAllSelections() {
    this.selectedBodyTypes = [];
    this.selectedFuelTypes = [];
    this.selectedTransmissionTypes = [];
    this.selectedSeatCapacities = [];
    this.getAllCars()
  }
  onSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.priceOrder = selectedValue; // Set this.priceOrder based on the selected option
    // Call your filtering/sorting logic here or trigger any other necessary actions
    this.applyFilters();
    
    // Now you can use the selectedValue (either 'asc' or 'desc') for sorting.
    // For example, you can update your sorting logic here.
    // Call your sorting function or update any relevant variables.
}
  applyFilters(value?:string) {

    if(value){
      this.priceOrder = 'asc'
    }
    const filters = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      bodyType: this.selectedBodyTypes,
      fuelType: this.selectedFuelTypes,
      transmission: this.selectedTransmissionTypes,
      seatCapacity: this.selectedSeatCapacities,
      sort: this.priceOrder,
      page: this.currentPage,
      pageSize: this.pageSize
    };
  
    this.userApi.getFilteredCars(filters)
      .subscribe((res:any) => {
        this.allCars = res.cars;
        console.log(res.cars,"checking cars");
        
        this.totalItems = res.totalCount;
        this.calculateTotalPages();
      });
  }
  calculateTotalPages(): void {
    // Calculate the total number of pages based on the total items and page size
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  getPages(): number[] {
    // Generate an array of page numbers from 1 to totalPages
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
}
