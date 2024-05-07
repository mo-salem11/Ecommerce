import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserProfileService } from '../../core/services/user-profile.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  image:any='';
  userName:any='';
  constructor(
   private _UserProfileService:UserProfileService
  ){}

  ngOnInit(): void {
    this._UserProfileService.userImagePath.subscribe({
     next:(path)=>{
       this.image=path;
     }
    });
    this._UserProfileService.userName.subscribe({
      next:(data)=>{
     this.userName=data;
      }
    })
    if(localStorage.getItem('username')!==null){
      this.userName=localStorage.getItem('username');
    }
    if (localStorage.getItem('imageUser') !== null) {
     this.image = localStorage.getItem('imageUser');
   }
  }
}
