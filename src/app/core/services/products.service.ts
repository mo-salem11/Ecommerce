import { AppConfig } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }


  getProducts(pageNum:number=1):Observable<any>{
       return this._HttpClient.get(AppConfig.baseUrl+`products?page=${pageNum}`);
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+'categories');
  }
  getSpecificCat(id:string|null):Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+'categories/'+id);
  }
  getSubOfSpecficCat(id:string|null):Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+'categories/'+id+'/subcategories');
  }
  getBrands(curPage:number=1):Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+`brands?limit=12&page=${curPage}`);
  }
  getSpecificBrand(id:string|null):Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+'brands/'+id);
  }

  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+`products/${id}`);
  }
}
