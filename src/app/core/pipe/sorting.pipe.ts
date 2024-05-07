import { Product } from '../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting',
  standalone:true
})
export class SortingPipe implements PipeTransform {

  transform(prodcuts: Product[],type:string): Product[] {
       if(type==='a - z'){
          prodcuts.sort((a,b)=>a.title.localeCompare(b.title));
          return prodcuts;
       }
       else if(type=='z - a'){
        prodcuts.sort((a,b)=>b.title.localeCompare(a.title));
        return prodcuts;
       }else if (type==='highest'){
        prodcuts.sort((a, b) => b.price>=a.price ?1:-1)
        return prodcuts;
       }else if(type==='lowest'){
        prodcuts.sort((a, b) => a.price>=b.price ?1:-1)
        return prodcuts;
       }else if(type==='top rated'){
        prodcuts.sort((a, b) => b.ratingsAverage.toString().localeCompare(a.ratingsAverage.toString()))
        return prodcuts;
       }
       return prodcuts;
  }

}
