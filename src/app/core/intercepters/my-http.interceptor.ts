import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>>{

  if (localStorage.getItem('etoken')!==null) {
      const myToken:any={
       token: localStorage.getItem('etoken'),
      }
     request=request.clone({
      setHeaders:myToken
     });

    }
    return next.handle(request);
  }
}


