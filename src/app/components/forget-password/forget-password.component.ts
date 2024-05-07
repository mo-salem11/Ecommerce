import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../core/services/forget-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  constructor(
    private _ForgetPasswordService:ForgetPasswordService,
    private _ToastrService:ToastrService,
    private _Router:Router){}

  errMsg:string='';
  isLoading:boolean=false;
  backLoading:boolean=false;
 step1:boolean=true;
 step2:boolean=false;
 step3:boolean=false;
 email:string='';
 forgetForm:FormGroup= new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email,])
 })

 handleForm1():void{
  this.isLoading=true;
  let useData=this.forgetForm.value;
  this.email=useData.email;
 this._ForgetPasswordService.forgetPassword(useData).subscribe({
  next:(res)=>{
    this._ToastrService.success(res.message);
    this.isLoading=false;
    this.step1=false;
    this.step2=true;
  },
  error:(err)=>{
    this.isLoading=false;
    this.errMsg=err.error.message;
  }
 })

 }

 resetCodeForm:FormGroup=new FormGroup({
  Code1: new FormControl('', Validators.required),
  Code2: new FormControl('', Validators.required),
  Code3: new FormControl('', Validators.required),
  Code4: new FormControl('', Validators.required),
  Code5: new FormControl('', Validators.required),
  Code6: new FormControl('', Validators.required),
 })

 handleForm2():void{
  this.isLoading=true;
  const resetCode = Object.values(this.resetCodeForm.value).join('');
  const requestData = {
    resetCode: resetCode
  };
  this._ForgetPasswordService.resetCode(requestData).subscribe({
    next:(res)=>{
        this._ToastrService.success(res.status);
        this.step2=false;
        this.step3=true;
        this.isLoading=false;
    },
    error:(err)=>{
      this.isLoading=false;
      this.errMsg=err.error.message;
    }
  })
 }

 onKeyUp(event: KeyboardEvent, nextInputIndex?: number):void{
  const input = event.target as HTMLInputElement;
  const inputValue = input.value;
  if (inputValue && nextInputIndex !== undefined) {
   const nextInput= document.querySelector(`input[formControlName=Code${nextInputIndex}]`)as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
 }

 onBackBtn(){
  this.step2=false;
  this.step1=true;
}

 resetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl(''),
  newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)])
 })


handleForm3():void{
  this.isLoading=true;
  let useData=this.resetPasswordForm.value;
  this._ForgetPasswordService.resetPassword(useData).subscribe({
    next:(res)=>{
      this.isLoading=false;
      this._Router.navigate(['/login']);
    },
    error:(err)=>{
      this.isLoading=false;
      this.errMsg=err.error.message;
    }
  })

 }
}
