import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.css']
})
export class TaxListComponent implements OnInit{

  allTax:any[]=[];
  constructor(private adminApi:AdminServiceService,private router:Router,private toastr:ToastrService) {}
  ngOnInit(): void {
    this.getTaxDetails()
  }
  getTaxDetails(){
    return this.adminApi.getTaxDetails().subscribe((res:any) => { 
      this.allTax = res.allTaxData
    },(err) => { 
      this.router.navigate(['/admin/adminHome'])
    })
  }
  editTax(taxId:string){
    this.router.navigate([`/admin/editTax/${taxId}`],);
    
  }
  deleteTax(taxId:string){
    this.adminApi.deleteTax(taxId).subscribe((res:any) => { 
      this.toastr.success('Tax Deleted','Successfully', { progressBar: true });
      this.ngOnInit()
    },(err) => {
      this.toastr.error(err.error.message ,'', {progressBar: true})
    })
  }
}
