import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'selectedBrand',
  standalone:true,
})
export class SelectedBrandPipe implements PipeTransform {

  transform(Products:Product[], Name: string): Product[] {
    return Products.filter((brand=>{
       if(Name==='all brands'){
        return brand;
       }else{
        return brand.brand.name.replace(/\s/g, "").toLowerCase()=== Name.replace(/\s/g, "").toLowerCase();
       }

    }))
  }

}
