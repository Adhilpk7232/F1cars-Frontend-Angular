import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carPricePipe'
})
export class CarPricePipePipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '₹'): string {
    if (isNaN(value) || value === 0) {
      return '0';
    }

    let formattedValue: string;

    if (value >= 10000000) {
      const croreValue = value / 10000000;
      formattedValue = `${currencySymbol} ${croreValue.toFixed(2)} Crores`;
    } else {
      const lakhValue = value / 100000;
      formattedValue = `${currencySymbol} ${lakhValue.toFixed(2)} Lakhs`;
    }

    return formattedValue;
  }

}
