import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-capcity',
  templateUrl: './seat-capcity.component.html',
  styleUrls: ['./seat-capcity.component.css']
})
export class SeatCapcityComponent implements OnInit {
  @Input() seatCapacity:string[]=[];
  constructor(
    private router:Router
  ){}
  ngOnInit(): void {
    
  }
  fiterSubmit(seatCapacity:string){
    this.router.navigate(['/filteredcars'], {
      queryParams: {
        body: '',
        fuel: '',
        seatcapacity: seatCapacity,
        transmission: '',
        // Add more query parameters here...
      },
    });
    
  }
}
