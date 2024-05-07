import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistNum:BehaviorSubject<number>=new BehaviorSubject(0);
  // myToken:any={
  //   token:localStorage.getItem('etoken')
  // }
  constructor(private _HttpClient:HttpClient) { }

  addToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(AppConfig.baseUrl+'wishlist',{
      productId
    })
  }

  deleteFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(AppConfig.baseUrl+'wishlist/'+productId)
  }

  getUserWishlist():Observable<any>{
    return this._HttpClient.get(AppConfig.baseUrl+'wishlist');
  }


}
