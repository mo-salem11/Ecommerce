import {  Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {

  constructor() { }

  sharedProducts:BehaviorSubject<Product[]>=new BehaviorSubject<Product[]>([]);
  sharedResult:Observable<Product[]>=this.sharedProducts.asObservable();

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);

  searchName:string='';

 setSearchProducts(products:Product[],name:string):void{
   this.sharedProducts.next(products);
   this.searchName=name;
  }
  curPoducts:Product[]=[];
}
