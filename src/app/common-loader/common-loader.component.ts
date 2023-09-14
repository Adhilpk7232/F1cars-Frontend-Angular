import { Component } from '@angular/core';
import { LoaderserviceService } from '../services/loader/loaderservice.service';

@Component({
  selector: 'app-common-loader',
  templateUrl: './common-loader.component.html',
  styleUrls: ['./common-loader.component.css']
})
export class CommonLoaderComponent {
  constructor(public loaderService: LoaderserviceService) {}
}
