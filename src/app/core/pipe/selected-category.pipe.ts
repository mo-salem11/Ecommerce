import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'selectedCategory',
  standalone:true
})
export class SelectedCategoryPipe implements PipeTransform {


  transform(Products: Product[], Name:string): Product[] {

    return Products.filter((product)=>{
      if(Name==='all categories'){
        return product;
      }
      return product.category.name.toLowerCase()===Name.toLowerCase()||product.subcategory[0].name.toLowerCase().includes(Name.toLowerCase())
    });

  }

}
