import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PasswordComponent } from './password/password.component';
import { AddressComponent } from './address/address.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserProfileService } from '../../core/services/user-profile.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,PasswordComponent,AddressComponent,UserinfoComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userInfo:boolean=true;
  password:boolean=false;
  address:boolean=false;
  userName:any;
  image:any='';
 constructor(
  private _UserProfileService:UserProfileService
 ){}

 ngOnInit(): void {
   this._UserProfileService.userImagePath.subscribe({
    next:(path)=>{
      this.image=path;
    }
   });
   if (localStorage.getItem('imageUser') !== null) {
    this.image = localStorage.getItem('imageUser');
  }
  this._UserProfileService.userName.subscribe({
    next:(data)=>{
      this.userName=data;
    }
  });
  if (localStorage.getItem('username') !== null) {
    this.userName = localStorage.getItem('username');
  }
 }

 uploadImage(event: any) {
  if (event.target?.files) {
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event) => {
    this.image = event.target?.result;
    this._UserProfileService.userImagePath.next(this.image);
    localStorage.setItem('imageUser', this.image);
  };
}
}
  toggleList(list:string){
    if(list==='userinfo'){
      this.userInfo=true;
      this.address=false;
      this.password=false;

    }
    else if(list==='password'){
      this.userInfo=false;
      this.address=false;
      this.password=true;

    }
    else if(list==='address'){
      this.userInfo=false;
      this.address=true;
      this.password=false;

    }

  }
}
