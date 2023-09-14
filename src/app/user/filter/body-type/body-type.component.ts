import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.css']
})
export class BodyTypeComponent implements OnInit{
  @Input() bodyTypes:string[]=[]
  carData:any[]=[]
  constructor(
    private userApi:UserServiceService,
    private router:Router
  ){}
  ngOnInit(): void {
    
  }
  applyFilters() {

    const filters = {

      bodyType: this.bodyTypes,

    };
  
    this.userApi.getFilteredCars(filters)
      .subscribe(cars => {
        this.carData = cars
      });
  }
  fiterSubmit(body:string){
    this.router.navigate(['/filteredcars'], {
      queryParams: {
        body: body,
        fuel: '',
        seatcapacity: '',
        transmission: '',
        // Add more query parameters here...
      },
    });
    
  }

}
