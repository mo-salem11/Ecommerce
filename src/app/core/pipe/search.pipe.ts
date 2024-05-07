import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone:true
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], search:string): Product[] {
    return products.filter((item)=>{
        return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }

}
