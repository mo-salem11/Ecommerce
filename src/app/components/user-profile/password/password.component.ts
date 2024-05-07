import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {

  constructor(
    private _FormBuilder: FormBuilder,
    private _UserProfileService:UserProfileService,
    private _ToastrService:ToastrService,
    private _Router:Router
  ){}

  isLoading: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;

  confirmPassword = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    if (rePassword !== password) {
      control.get('rePassword')?.setErrors({ noMatch: true });
    }
  };


  updateFormPassword:FormGroup=this._FormBuilder.group({
    currentPassword: ['', [Validators.required]],
    password: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],],
    rePassword: ['', [Validators.required]],
  },
  {
    validators: [this.confirmPassword]
  }as FormControlOptions,)

  changePassword(form: FormGroup){
    if (form.valid && !this.isLoading) {
      this.isLoading=true;
      this._UserProfileService.updatePassword(form.value).subscribe({
        next:(res)=>{
          this._ToastrService.success('Your password has changed successfully, Now login again');
          this.isLoading=false;
          this.readonly=!this.readonly;
          this.disabled=!this.disabled;
          this._Router.navigate(['/login'])
        },
        error:(err)=>{
          this._ToastrService.error(err.error.errors.msg);
          this.isLoading=false;
        }
      })
    }

  }
  removedisable(){
    this.readonly = !this.readonly;
    this.disabled=!this.disabled;
   }


   get currPassowrd(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('currentPassword');
  }
  get newPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('password');
  }
  get reNewPassword(): AbstractControl<any, any> | null {
    return this.updateFormPassword.get('rePassword');
  }
}
