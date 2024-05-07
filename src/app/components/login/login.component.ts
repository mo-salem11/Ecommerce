import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service.service';
import {  Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _ToastrService:ToastrService,){}
  errMsg:string='';
  isLoading:boolean=false;
   loginForm:FormGroup=new FormGroup({
     email:new FormControl('',[Validators.required,Validators.email,]),
     password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
   },
   );

  ngOnInit(): void {
    if(localStorage.getItem('etoken')===null){
      this._ToastrService.warning('You are not logged in. Please login to get access');
    }
  }

   handleForm():void{
     this.isLoading=true;
   let useData=this.loginForm.value;
   if(this.loginForm.valid===true){
     this._AuthService.login(useData).subscribe({
       next:(res)=>{
         if(res.message==="success"){
            this.isLoading=false;
            localStorage.setItem('etoken',res.token);
            this._AuthService.decodeUser();
            this._Router.navigate(['/home']);
         }
       },
       error:(err)=>{
         this.errMsg=err.error.message;
         this.isLoading=false;
       }
     });
   }

  }
}
