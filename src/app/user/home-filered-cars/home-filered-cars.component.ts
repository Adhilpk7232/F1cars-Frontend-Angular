import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getfilterDataRes } from 'src/app/models/getFilterDataRes';
import { UserDataState } from 'src/app/models/userDataSate';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home-filered-cars',
  templateUrl: './home-filered-cars.component.html',
  styleUrls: ['./home-filered-cars.component.css']
})
export class HomeFileredCarsComponent implements OnInit{

  allCars:any[]=[]
  filterName!:string|null;
  userLogin!: boolean;
  userData!:UserDataState;
  bodytype!:string;
  fueltype!:string;
  seat!:string;
  gear!:string;
  currentPage:number = 1;
  pageSize:number = 10
  totalItems:number = 0
  totalPages:number = 0 
  selectedBodyTypes: string[] = [];
  selectedFuelTypes: string[] = [];
  selectedTransmissionTypes: string[] = [];
  selectedSeatCapacities: string[] = [];
  minPrice!:number;
  maxPrice!:number;
  priceOrder:String = '';
  filterData!:getfilterDataRes;
  uniqueBodyTypes:string[] = [];
  uniqueTransmissions:string[] = [];
  uniqueFuelTypes:string[] = [];
  uniqueSeatCapacities:string[] = [];
  Bodymore:boolean = false
  Fuelmore:boolean = false
  Transmissionmore:boolean = false
  seatCapacitymore:boolean = false
  showMore:boolean = false
  filtercurrentPage:number = 1;
  filterpageSize:number = 10
  filtertotalItems:number = 0
  filtertotalPages:number = 0 
  filter!:boolean;
  


  constructor(
    private userApi:UserServiceService,
    private route:ActivatedRoute
  ){
    this.route.queryParams.subscribe((params) => {
      const body = params['body'] || ''; // Default value if not provided
      const fuel = params['fuel'] || ''; // Default value if not provided
      const seatCapacity = params['seatcapacity'] || ''; // Default value if not provided
      const transmission = params['transmission'] || ''; // Default value if not provided
      if(body){
        this.bodytype = body
        this.filterName = body
      }
      if(fuel){
        this.fueltype = fuel
        this.filterName = fuel

      }
      if(seatCapacity){
        this.seat = seatCapacity
        this.filterName = seatCapacity

      }
      if(transmission){
        this.gear  =transmission
        this.filterName = transmission

      }
  
      // You can now use these values in your component logic.
      console.log('filterName:', this.filterName);
      console.log('body:', body);
      console.log('Fuel:', fuel);
      console.log('Seat Capacity:', seatCapacity);
      console.log('Transmission:', transmission);
    });
  }

  ngOnInit(): void {
    this.getAllCars()
    this.getFilterData()

  }
  getImageUrl(image: string) {
    if(image){
      return this.userApi.loadimage(image);
    }else {
      return null
    }
  }
  getAllCars(){
    
    this.filter = false
    const filters = {
      minPrice: '',
      maxPrice: '',
      bodyType: this.bodytype,
      fuelType: this.fueltype,
      transmission:this.gear,
      seatCapacity: this.seat,
      sort: '',
      page: this.currentPage,
      pageSize: this.pageSize
    };
  
    this.userApi.getFilteredCars(filters)
      .subscribe((res:any)=>{
        this.allCars = res.cars;
        this.totalItems = res.totalCount;
        this.calculateTotalPages();
      }) ;
       
      
    this.userApi.getFilteredCars
  }
  onPageChange(page: number): void {
    // Handle page change event (e.g., user clicks on a page number)
    this.currentPage = page;
    this.getAllCars();
  }
  filteronPageChange(page: number): void {
    // Handle page change event (e.g., user clicks on a page number)
    console.log(page,"page in filter");
    
    this.filtercurrentPage = page;
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
  calculateTotalPages(): void {
    // Calculate the total number of pages based on the total items and page size
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  filtercalculateTotalPages(): void {
    // Calculate the total number of pages based on the total items and page size
    this.filtertotalPages = Math.ceil(this.filtertotalItems / this.filterpageSize);
  }
  onSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.priceOrder = selectedValue; // Set this.priceOrder based on the selected option
    // // Call your filtering/sorting logic here or trigger any other necessary actions
    this.applyFilters();  
    
    // Now you can use the selectedValue (either 'asc' or 'desc') for sorting.
    // For example, you can update your sorting logic here.
    // Call your sorting function or update any relevant variables.
}
filtergetPages(): number[] {
  // Generate an array of page numbers from 1 to totalPages
  return Array.from({ length: this.filtertotalPages }, (_, i) => i + 1);
}
getPages(): number[] {
  // Generate an array of page numbers from 1 to totalPages
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}
clearAllSelections() {
  this.selectedBodyTypes = [];
  this.selectedFuelTypes = [];
  this.selectedTransmissionTypes = [];
  this.selectedSeatCapacities = [];
  this.getAllCars()
}
applyFilters(value?:string) {
  console.log(this.filtercurrentPage,"current page n filter");
  
  this.filter = true;
  
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
    page: this.filtercurrentPage,
    pageSize: this.filterpageSize
  };

  this.userApi.getFilteredCars(filters)
    .subscribe((res:any) => {
      this.allCars = res.cars;
      console.log(res.cars,"checking cars");
      
      this.filtertotalItems = res.totalCount;
      this.filtercalculateTotalPages();
    });
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


}
