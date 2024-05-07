import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price',
  standalone:true
})
export class PricePipe implements PipeTransform {
  transform(product: Product[], priceNumber: number): Product[] {
    return product.filter((item) => {
      return item.price <= priceNumber;
    });
  }
}
