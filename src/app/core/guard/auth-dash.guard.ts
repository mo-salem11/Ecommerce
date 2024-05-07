import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { userAuth } from '../interfaces/userAuth';


export const authDashGuard: CanActivateFn = (route, state) => {

  const _AuthService=inject(AuthService)
  const _Router=inject(Router);
  let value:userAuth={} as userAuth;
  _AuthService.userDashInfo.subscribe({
    next:(data)=>{
      value=data;
    }
  })

  if(value.user==="admin"&&value.password=="12345"){
    return true;
  }
 else {
  _Router.navigate(['/dashboard/login']);
  return false;
 }


};
