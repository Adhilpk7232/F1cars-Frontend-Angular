import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit{

  // collapsed =  true;
  // navData = navbarData;
  isSidebarOpen = false;

  constructor(){

  }
  ngOnInit(): void {
    
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
