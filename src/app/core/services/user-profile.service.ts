import { specificAddress } from './../interfaces/addresses';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../../config';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userImagePath: BehaviorSubject<string> = new BehaviorSubject('');
  userName: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private _httpClient:HttpClient,
    private _AuthService:AuthService
  ) { }
  userdata: any = this._AuthService.decodeUser();
  updateUserInfo(userData: object): Observable<any> {
    return this._httpClient.put(AppConfig.baseUrl+`users/updateMe`,
      userData
    );
  }
  defualtUserInfo(): Observable<any> {
    return this._httpClient.get(AppConfig.baseUrl+`users/${this.userdata.id}`);
  }
  updatePassword(userData:object): Observable<any>{
    return this._httpClient.put(AppConfig.baseUrl+'users/changeMyPassword',userData);
  }
  getLoggedUserAddresses(): Observable<any> {
    return this._httpClient.get(AppConfig.baseUrl+'addresses');
  }
  deleteAddress(addressId:string): Observable<any>{
    return this._httpClient.delete(AppConfig.baseUrl+`addresses/${addressId}`);
  }
  addAddress(userData:object):Observable<any>{
   return this._httpClient.post(AppConfig.baseUrl+'addresses',userData);
  }
  getSpecificAddress(addressId:string){
    return this._httpClient.get<specificAddress>(AppConfig.baseUrl+`addresses/${addressId}`);
  }
  updateUserAddress(addressDetails: {}, addressId: string): Observable<any> {
    return this._httpClient.put(AppConfig.baseUrl+`addresses/${addressId}`,addressDetails);
  }
  getAllOrders(pageNum:number=1):Observable<any>{
   return this._httpClient.get(AppConfig.baseUrl+`orders?limit=10&page=${pageNum}`);
  }
}
