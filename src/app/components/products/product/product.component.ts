import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input, Output, Renderer2 } from '@angular/core';
import { CarouselModule,OwlOptions  } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { WishlistService } from '../../../core/services/wishlist.service';
import { StarRatingComponent } from '../../product-details/star-rating/star-rating.component';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,StarRatingComponent,RouterLink,CarouselModule,NgxSkeletonLoaderModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() wishlistSet: Set<any>= new Set<any>();

  @Output() openModal = new EventEmitter<Product>();

   @Input() item:Product={} as Product;
   @Input() marginHome:boolean=false;
   @Input() fromSubCat:boolean=false;
   @Input() fixUrlImgWishlist:boolean=false;
   @Input() fromWishlistPage:boolean=false;

   curModel:Product={} as Product;
   @Output() filterProduct:EventEmitter<string>=new EventEmitter<string>();

   cartBtnLoading:boolean=false;
   displaySlider:boolean=false;
   mobileQuery!: MediaQueryList;
   smallQuery!: MediaQueryList;
   showModel:boolean=false;
  constructor(
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService,
    private _MediaMatcher:MediaMatcher
    ){
      this.mobileQuery=_MediaMatcher.matchMedia('max-width:767px');
      this.smallQuery=_MediaMatcher.matchMedia('max-width:576px');

    }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout: 1000,
    autoplaySpeed:500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
   }


handleHover(display:boolean):void{
  this.displaySlider=display;
  }

addProductToCart(productId:string,element:HTMLButtonElement):void{
    this.cartBtnLoading=true;
    if(localStorage.getItem('etoken')!==null){
      this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        this.cartBtnLoading=false;
        this._ToastrService.success(
          res.message + '<img width=30 src="./assets/cart_891468.png">');
          this._Renderer2.removeAttribute(element,'disabled');
          this._CartService.cartNum.next(res.numOfCartItems);
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message);
        this._Renderer2.removeAttribute(element,'disabled');
      }
    })
  }
  else{
    this.cartBtnLoading=false;
    this._ToastrService.warning('You are not logged in. Please login to get access');
  }
}

addToWishlist(productId:string):void{
  if(localStorage.getItem('etoken')!==null){
      this.wishlistSet.add(productId);
     this._WishlistService.addToWishlist(productId).subscribe({
      next:(res)=>{
         this._ToastrService.success(res.message+'<i class="fa-solid text-danger fs-4 fa-heart cartIcon"></i>');
         this._WishlistService.wishlistNum.next(res.data.length);
      },
      error:(err)=>{
        this._ToastrService.error(err.message);
      }
     })
    }
    else{
      this._ToastrService.warning('You are not logged in. Please login to get access');
    }
}

removeFromWishlist(productId:string){
 this.wishlistSet.delete(productId);
  this._WishlistService.deleteFromWishlist(productId).subscribe({
      next:(res)=>{
        this._ToastrService.warning(res.message+'<i class="fa-solid text-danger fs-4 fa-heart cartIcon"></i>');
        this._WishlistService.wishlistNum.next(res.data.length);
        if(this.fixUrlImgWishlist){
             this.fixUrlImgWishlist=false;
        }
      }
    });
    if(this.fromWishlistPage){
      this.filterProduct.emit(productId);
    }
}

displayModel(){
  this.showModel=true;
  this.curModel=this.item;
}

imageIsLoading: boolean = true;

  imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 1000);
  }
}
