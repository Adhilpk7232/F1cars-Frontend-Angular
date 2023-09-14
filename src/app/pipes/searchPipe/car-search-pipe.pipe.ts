import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carSearchPipe'
})
export class CarSearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return [];
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Customize this condition based on the structure of your item
      return item.carName.toLowerCase().includes(searchText);
    });
  }

}
