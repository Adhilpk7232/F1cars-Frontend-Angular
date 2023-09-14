import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoaderserviceService } from './services/loader/loaderservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'f1cars';
  isLoading = false;
  constructor(private router: Router, private loaderService: LoaderserviceService){}
  ngOnInit(): void {
    initFlowbite();
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  
  }
}
