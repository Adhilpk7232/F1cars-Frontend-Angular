import { Pipe, PipeTransform } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SingleTaxData } from 'src/app/models/SingleTaxData';

@Pipe({
  name: 'calculateTax'
})
export class CalculateTaxPipe implements PipeTransform {
  constructor(private userApi:UserServiceService,private sanitizer: DomSanitizer){}

  transform(basePrice: number, location: string): Promise<SafeHtml>  {
    return new Promise((resolve, reject) => {
      // Fetch tax data based on location
      this.userApi.getTaxData(location).subscribe(
        (taxData: SingleTaxData) => {
          if (taxData && taxData.tax) {
            const taxRate = taxData.tax / 100; // Convert percentage to decimal
            const taxAmount = basePrice * taxRate;
            const totalAmount = basePrice + taxAmount;
            if (totalAmount >= 10000000) {
              const croreValue = totalAmount / 10000000;
              const result = `₹ ${croreValue.toFixed(2)} Crores,<br> On-Road Price , ${taxData.state}`
              resolve(this.sanitizer.bypassSecurityTrustHtml(result));
            } else {
              const lakhValue = totalAmount / 100000;
              const result =`₹ ${lakhValue.toFixed(2)} Lakhs,<br> On-Road Price , ${taxData.state}`
              resolve(this.sanitizer.bypassSecurityTrustHtml(result));
            }
            
          } else {
            resolve('Invalid location or tax data not found');
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
