import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartNum:BehaviorSubject<number>=new BehaviorSubject(0);
 OrdersNum:BehaviorSubject<number>=new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) { }

 addToCart(productId:string):Observable<any>{
   return this._HttpClient.post(AppConfig.baseUrl+`cart`,
   {productId})
 }

 getCartUser():Observable<any>{
   return this._HttpClient.get(AppConfig.baseUrl+'cart',)
 }

 deleteProduct(productId:string):Observable<any>{
  return  this._HttpClient.delete(AppConfig.baseUrl+'cart/'+productId,)
 }

 updateProductQuantity(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(AppConfig.baseUrl+'cart/'+productId,{count})
 }

 clearCart():Observable<any>{
  return this._HttpClient.delete(AppConfig.baseUrl+'cart')
 }

 checkout(id:string|null,orderInfo:object):Observable<any>{
  return this._HttpClient.post(AppConfig.baseUrl+`orders/checkout-session/${id}?url=https://freshcart-eccommerce.netlify.app`,orderInfo);
 }

 cashOrders(id:string|null,orderInfo:object):Observable<any>{
  return this._HttpClient.post(AppConfig.baseUrl+`orders/${id}`,orderInfo);
 }

 getAllOrders(id:string|null){
  return this._HttpClient.get(AppConfig.baseUrl+'orders/user/'+id);
 }
}
