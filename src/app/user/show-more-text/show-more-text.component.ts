import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-more-text',
  templateUrl: './show-more-text.component.html',
  styleUrls: ['./show-more-text.component.css']
})
export class ShowMoreTextComponent implements OnInit{
  @Input() text!:string;
  @Input() wordLimit!:number;
  showMore!:boolean;

  constructor(){
    this.showMore = false
  }

  ngOnInit(): void {
    
  }

}
