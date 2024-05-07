import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private _HttpClient:HttpClient) { }

  forgetPassword(userEmail:object):Observable<any>{
      return this._HttpClient.post(AppConfig.baseUrl+'auth/forgotPasswords',userEmail);
  }

  resetCode(code:object):Observable<any>{
    return this._HttpClient.post(AppConfig.baseUrl+`auth/verifyResetCode`,code);
  }
  resetPassword(reset:object):Observable<any>{
    return this._HttpClient.put(AppConfig.baseUrl+`auth/resetPassword`,reset);
  }
}
