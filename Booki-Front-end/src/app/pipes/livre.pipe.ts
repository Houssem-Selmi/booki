import { Pipe, PipeTransform } from '@angular/core';
import { Livre } from '../domain/livre';

@Pipe({
  name: 'livre'
})
export class LivrePipe implements PipeTransform {

  transform(items: Livre[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.titre.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
}

}
