import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth-service.service';
import { Orders } from '../../core/interfaces/orders';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
   showShadow:boolean=false;
   cartNums:number=0;
   orderNums:number=0;
   wishlistNums:number=0;
   urlImage:any='';
   userName: any = '';
   userId:string|null='';
   userOrders:Orders[]=[];
   isLogged:boolean=false;
   @ViewChild('btn', { static: true }) myButton!: ElementRef;
   @ViewChild('list', { static: true }) myList!: ElementRef;
  constructor(
    private _Router:Router,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _AuthService:AuthService,
    private _UserProfileService:UserProfileService,
    private _Renderer2:Renderer2
    ){
      this.isLogged=localStorage.getItem('etoken')!==null;
    }

  ngOnInit(): void {

    this._UserProfileService.userName.subscribe({
      next:(data)=>{
        this.userName=data;
      }
    });
    this.userName=localStorage.getItem('username');
  const user=this._AuthService.decodeUser();
  this.userId=user.id;
 this._CartService.getAllOrders(this.userId).subscribe({
  next:(res)=>{
    this.userOrders=res as Orders[];
    this._CartService.OrdersNum.next(this.userOrders.length);
  }
 });
 this._CartService.OrdersNum.subscribe({
  next:(data)=>{
    this.orderNums=data;  }
 })

    this._CartService.getCartUser().subscribe({
      next:(res)=>{
        this.cartNums=res.numOfCartItems;
      }
    });
    this._CartService.cartNum.subscribe({
      next:(data)=>{
       this.cartNums=data;
      }
    })

    this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistNums=res?.data.length;
      }
    })
    this._WishlistService.wishlistNum.subscribe({
      next:(data)=>{
        this.wishlistNums=data;
      }
    })
    this.subscriptionUserImage();
  }

  logOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login'])
}

toggleIcon(){
  const buttonElement = this.myButton.nativeElement;
  const ListElement =this.myList.nativeElement;
  const isExpanded = buttonElement.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    this._Renderer2.setAttribute(buttonElement, 'aria-expanded', 'false');
    this._Renderer2.removeClass(ListElement,'show');
  } else {
    this._Renderer2.setAttribute(buttonElement, 'aria-expanded', 'true');
    this._Renderer2.addClass(ListElement,'show');
  }
  this.showList=false;

}


@HostListener('window:scroll',[])
onWindowScroll(){
  const scrollThreshold = 100;
  const scrollY = window.scrollY;
  this.showShadow=scrollY>scrollThreshold;
}

subscriptionUserImage(){
  this._UserProfileService.userImagePath.subscribe({
    next:(path)=>{
      this.urlImage=path;
    }
  });
  if (localStorage.getItem('imageUser') !== null) {
    this.urlImage = localStorage.getItem('imageUser');
  }
}
uploadImgeUser(event:any){
  if (event.target?.files) {
    var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.urlImage = event.target?.result;
        localStorage.setItem('imageUser', this.urlImage);
        this._UserProfileService.userImagePath.next(this.urlImage);
  }
}
}
showList:boolean=false;
toggleList(){
 this.showList=!this.showList;
}
}
