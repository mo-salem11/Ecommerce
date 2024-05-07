import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {AppConfig} from '../../config'
import { jwtDecode } from 'jwt-decode';
import { userAuth } from '../interfaces/userAuth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   userInfo:object={};
   userDashInfo:BehaviorSubject<userAuth>=new BehaviorSubject<userAuth>({}as userAuth);
  constructor(private _HttpClient:HttpClient) {}

  register(userData:Object):Observable<any>{
    return this._HttpClient.post(AppConfig.baseUrl+'auth/signup',userData);
  }

  login(userData:object):Observable<any>{
    return this._HttpClient.post(AppConfig.baseUrl+'auth/signin',userData);
  }

  decodeUser():any{
    const encode=localStorage.getItem('etoken');
    if(encode!==null){
      const decode=jwtDecode(encode);
      this.userInfo=decode;
      return decode;
    }

  }

}
