import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.scss'
})
export class UserinfoComponent implements OnInit{
  defaultName: any = '';
  defaultEmail: string = '';
  defaultPhone: string = '';
  isLoading: boolean = false;
  disabled: boolean = false;
  readonly: boolean = true;
  allDefualtUserData: any = {};
  updateFormData!: FormGroup;
  constructor(
    private _FormBuilder:FormBuilder,
    private _UserProfileService:UserProfileService,
    private _ToastrService:ToastrService,
  ){}
 ngOnInit(): void {
  this.getdefaultInfo();
  this.updateFormData = this._FormBuilder.group({
    name: [
      this.defaultName,
      [Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [, Validators.email],
    phone: [, [Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });
 }

 getdefaultInfo(){
  this._UserProfileService.defualtUserInfo().subscribe({
    next:(res)=>{
      this.defaultName=res.data.name;
      this.defaultEmail=res.data.email;
      this.defaultPhone=res.data.phone;
      this.name?.setValue(this.defaultName);
      this.email?.setValue(this.defaultEmail);
      this.phone?.setValue(this.defaultPhone);
    }
  })
 }

 removedisable(){
  this.readonly = !this.readonly;
  this.disabled=!this.disabled;
 }
 updateData(form: FormGroup) {
  if (form.valid && !this.isLoading) {
      this.isLoading=true;
      this._UserProfileService.updateUserInfo(form.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          this.readonly=!this.readonly;
          this.disabled=!this.disabled;
         this._ToastrService.success('Your info updated successfully')
          this._UserProfileService.userName.next(res.user.name);
          localStorage.setItem('username', res.user.name);
          this.getdefaultInfo();
        },
        error:(err)=>{
          this._ToastrService.error(err.error.message);
          this.isLoading=false;
          this.readonly=!this.readonly;
          this.disabled=!this.disabled;
          this.getdefaultInfo();
        }
      })
  }
 }

 get name(): AbstractControl<any, any> | null {
  return this.updateFormData.get('name');
}
get email(): AbstractControl<any, any> | null {
  return this.updateFormData.get('email');
}
get phone(): AbstractControl<any, any> | null {
  return this.updateFormData.get('phone');
}
}
