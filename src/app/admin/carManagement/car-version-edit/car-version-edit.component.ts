import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-version-edit',
  templateUrl: './car-version-edit.component.html',
  styleUrls: ['./car-version-edit.component.css']
})
export class CarVersionEditComponent implements OnInit{

  carId!:string|null;
  constructor(private route:ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
    
  }
}
