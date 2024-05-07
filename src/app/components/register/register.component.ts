import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service.service';
import {  Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}
  errMsg:string='';
  isLoading:boolean=false;
  registerFrom:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email,]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },
  {
    validators:[this.confirmPassword]
  }as FormControlOptions);


  confirmPassword(group:FormGroup):void{
    const password=group.get('password');
    const rePassword=group.get('rePassword');
    if(rePassword?.value==''){
      rePassword?.setErrors({required:true});
    }
    else if(password?.value!=rePassword?.value){
      rePassword?.setErrors({mismatch:true});
    }
  }

  handleForm():void{
    const userData= this.registerFrom.value;
    this.isLoading=true;
    if(this.registerFrom.valid === true){
        this._AuthService.register(userData).subscribe({
          next:(res)=>{
            if(res.message==='success'){
               this.isLoading=false;
                this._Router.navigate(['/login'])
            }
          },
          error:(err)=>{
            this.isLoading=false;
            this.errMsg=err.error.message;
          }
        })
    }
  }
}
