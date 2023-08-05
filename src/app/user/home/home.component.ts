import { Component } from '@angular/core';

interface Car {
  imageUrl: string;
  model: string;
  description: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedItem!:string;

  selectItem(item:string){
    this.selectedItem=item
  }


  cars: Car[] = [
    {
      imageUrl: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-4.jpeg?isig=0&q=75',
      model: 'Car Model 1',
      description: 'This is the description for Car 1.'
    },
    {
      imageUrl: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/135051/seltos-facelift-exterior-right-front-three-quarter-28.jpeg?isig=0&q=75',
      model: 'Car Model 2',
      description: 'This is the description for Car 2.'
    },
    {
      imageUrl: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/135051/seltos-facelift-exterior-right-front-three-quarter-28.jpeg?isig=0&q=75',
      model: 'Car Model 2',
      description: 'This is the description for Car 2.'
    },
    {
      imageUrl: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/135051/seltos-facelift-exterior-right-front-three-quarter-28.jpeg?isig=0&q=75',
      model: 'Car Model 2',
      description: 'This is the description for Car 2.'
    },
    // Add more car objects as needed
  ];
}
