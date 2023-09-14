import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.component.html',
  styleUrls: ['./transmission.component.css']
})
export class TransmissionComponent implements OnInit{
  @Input() transmission:string[]=[];
  constructor(
    private router:Router
  ){}
  ngOnInit(): void {
  }
  fiterSubmit(transmission:string){
    this.router.navigate(['/filteredcars'], {
      queryParams: {
        body: '',
        fuel: '',
        seatcapacity: '',
        transmission: transmission,
        // Add more query parameters here...
      },
    });
    
  }
}
