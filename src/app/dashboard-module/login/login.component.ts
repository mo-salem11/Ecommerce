import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service.service';
import {  Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  errMsg:string='';
  isLoading:boolean=false;
   loginForm:FormGroup=new FormGroup({
     user:new FormControl('',[Validators.required,Validators.pattern(/^admin$/),]),
     password:new FormControl('',[Validators.required,Validators.pattern(/^12345$/)]),
   },
   );



   handleForm():void{
     this.isLoading=true;
   let useData=this.loginForm.value;
   if(this.loginForm.valid===true){
       this._AuthService.userDashInfo.next(useData);
       this._Router.navigate(['dashboard/orders'])
   }

  }
}
