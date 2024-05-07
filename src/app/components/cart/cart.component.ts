import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { BtnCartComponent } from './btn-cart/btn-cart.component';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,BtnCartComponent,NgxSkeletonLoaderModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
 item:any=null;
 isLoading:boolean=false;
  constructor(
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private  _WishlistService:WishlistService,
    private _Router:Router){}

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(res)=>{
       this.item=res.data;
      },
      error:(err)=>console.log(err)
    })
}

  deleteProduct(productId:string,Btn:BtnCartComponent){
     Btn.isLoading=true;
     this._CartService.deleteProduct(productId).subscribe({
      next:(res)=>{
        Btn.isLoading=false;
        this.item=res.data;
        this._CartService.cartNum.next(res.numOfCartItems);
        this._ToastrService.warning('The product deleted successfully'+'<img width=30 src="./assets/deleteCartpng.png">')
      },
      error:(err)=>{
        console.log(err);
      }
     })
  }

  updateProductQuantity(productId:string,count:number,Btn:BtnCartComponent,productName:string):void{
    if(count==0){
       this.deleteProduct(productId,Btn);
    }else{
    this._CartService.updateProductQuantity(productId,count).subscribe({
        next:(res)=>{
          this.item=res.data;
          this._ToastrService.success(`Quantity of ${productName} updated successfully`+'<img width=30 src="./assets/cart_891468.png">')
        }
      })
    }
  }

  addToWishlist(productId:string):void{
   this._WishlistService.addToWishlist(productId).subscribe({
    next:(res)=>{
       this._ToastrService.success(res.message+'<i class="fa-solid text-danger fs-4 fa-heart cartIcon"></i>');
       this._WishlistService.wishlistNum.next(res.data.length);
       this._Router.navigate(['/wishlist'])
    },
    error:(err)=>{
      this._ToastrService.error(err.message);
    }
   })
}

  clearCart():void{
    this._CartService.clearCart().subscribe({
      next:()=>{
        this.item=null;
        this._CartService.cartNum.next(0);
        this._ToastrService.error('All products has been removed from your cart');
      },
      error:(err)=>{
        this._ToastrService.error(err.message);
      }
    })
  }


imageIsLoading: boolean = true;

imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 500);
}
}
