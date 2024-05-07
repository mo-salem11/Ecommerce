import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { Addresses,specificAddress } from '../../../core/interfaces/addresses';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit{
 addresses!:Addresses[];
 isLoading:boolean=false;
 updateAddressFlag: boolean = false;
 addressId:string='';
  constructor(
  private _UserProfileService:UserProfileService,
  private _ToastrService:ToastrService
){}

addAddressFrom:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  details:new FormControl('',[Validators.required,Validators.minLength(3)]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)])
})



ngOnInit(): void {
 this.getAllAddress();
}
getAllAddress():void{
  this._UserProfileService.getLoggedUserAddresses().subscribe({
    next:(res)=>{
      this.addresses=res.data;
    }
  })
}
deleteAddress(id:string):void{
  this._UserProfileService.deleteAddress(id).subscribe({
    next:(res)=>{
      this.addresses=res.data;
      this._ToastrService.warning('Adress Deleted Successfully')
    }
  })
}
addAddress():void{
 this.isLoading=true;
 this._UserProfileService.addAddress(this.addAddressFrom.value).subscribe({
  next:(res)=>{
    this.addresses=res.data;
    this.isLoading=false;
    this._ToastrService.success(res.message);
    this.addAddressFrom.reset();
  },
  error:(err)=>{
    this.isLoading=false;
  }
 })
}
editAddress(id:string):void{
 this._UserProfileService.getSpecificAddress(id).subscribe({
  next:(res:specificAddress)=>{
    this.addAddressFrom.get('name')?.setValue(res.data.name);
    this.addAddressFrom.get('details')?.setValue(res.data.details);
    this.addAddressFrom.get('phone')?.setValue(res.data.phone);
    this.addAddressFrom.get('city')?.setValue(res.data.city);
    this.addressId=id;
    this.updateAddressFlag=true;
  }
 })
}

updateAddress(){
  console.log('Mohamed')
 this._UserProfileService.updateUserAddress(this.addAddressFrom.value,this.addressId).subscribe({
  next:(res)=>{
    this.updateAddressFlag=false;
    this.getAllAddress();
    this._ToastrService.success(res.message);
    this.addAddressFrom.reset();
  }
  ,error:(err)=>{
    console.log(err);
    this.updateAddressFlag=false;
    this.addAddressFrom.reset();
  }
 })
}

submitType:string='';
onSubmit(){
  if (this.submitType == 'add') {
    this.addAddress();
  } else if (this.submitType == 'update') {
    this.updateAddress();
  }
}

addNewAddressFlag(type: string): void {
  this.submitType = type;
}
updateNewAddressFlag(type: string): void {
  this.submitType = type;
}
}

