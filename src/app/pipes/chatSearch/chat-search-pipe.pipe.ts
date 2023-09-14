import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatSearchPipe'
})
export class ChatSearchPipePipe implements PipeTransform {

  transform(items: any[], searchName: string): any[] {
    if (!items || !searchName) {
      return items;
    }

    searchName = searchName.toLowerCase();

    return items.filter(item => {
      // Customize this condition based on the structure of your item
      return item.reviewer.name.toLowerCase().includes(searchName);
    });
  }

}
