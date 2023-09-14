import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-type',
  templateUrl: './fuel-type.component.html',
  styleUrls: ['./fuel-type.component.css']
})
export class FuelTypeComponent implements OnInit{
  @Input() fuelTypes:string[]=[];
  constructor(
    private router:Router
  ){}
  ngOnInit(): void {
    
  }
  fiterSubmit(fuel:string){
    this.router.navigate(['/filteredcars'], {
      queryParams: {
        body: '',
        fuel: fuel,
        seatcapacity: '',
        transmission: '',
        // Add more query parameters here...
      },
    });
    
  }

}
