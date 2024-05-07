import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
@Pipe({
  name: 'rating',
  standalone:true,
})
export class StarPipe implements PipeTransform {
  transform(products: Product[], RatingNumber: number): Product[] {
    return products.filter((item) => {
      return Math.floor(item.ratingsAverage) <= RatingNumber;
    });
  }
}
