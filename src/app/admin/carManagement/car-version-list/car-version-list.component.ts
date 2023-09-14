import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-car-version-list',
  templateUrl: './car-version-list.component.html',
  styleUrls: ['./car-version-list.component.css']
})
export class CarVersionListComponent implements OnInit{

  carId!:string|null;
  versions:any[]=[]
  constructor(private route:ActivatedRoute,private router:Router,private http: HttpClient,private adminApi:AdminServiceService){

  }
  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId');
    this.getVersion(this.carId)
  }
  getVersion(carId:string|null){
    if(carId == null){
      return
    }
    this.adminApi.getVersions(carId).subscribe((res:any)=>{
      this.versions=res
      console.log(this.versions,"versions");
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  editVersion(versionId:string){
    console.log(versionId);
    
  }
  deleteVersion(versionId:string){
    console.log(versionId);
    
  }

  getImageUrl(image: string) {
    if(image){
      return this.adminApi.loadimage(image);
    }else {
      return null
    }
  }

  
  
}
