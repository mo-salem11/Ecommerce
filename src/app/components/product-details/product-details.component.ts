import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from './../../core/services/wishlist.service';
import { StarRatingComponent } from './star-rating/star-rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterLink,StarRatingComponent,FormsModule,NgxSkeletonLoaderModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   constructor(
    private _ActivatedRoute:ActivatedRoute
    ,private _ProductsService:ProductsService
    ,private _ToastrService:ToastrService
    ,private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2){}
   productDetails:Product={} as Product;
   showZoomedImage = false;
   zoomedImageUrl = '';
   zoomedImageSize: string = '';
   zoomedImagePosition:string='';
   zoomedImageTransitionClass:string='';
   curImg:string='';
   selectedValue: string = '1';
   loadingCart:boolean=false;
   loadingUpdate:boolean=false;
   wishlistSet: Set<any>= new Set<any>();
  @Input() selectedItemModal:Product={} as Product;
  fromModal:boolean=false;
  isLoading:boolean=true;
   ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
         let idProduct:string|null=params.get('id');
         if(idProduct){
          this._ProductsService.getProductDetails(idProduct).subscribe({
            next:(res)=>{
              this.productDetails=res.data;
              this.curImg=res.data.images[0];
              this.isLoading=false;
            },
            error:(err)=>{
              console.log(err);
              this.isLoading=false;
            }
           })
         }
      },
     });
     this.getLogedUserCart();
     this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishlistSet = new Set<any>(newData);
      }
    }
    )
   }
  ngOnChanges(): void {
    this._ProductsService.getProductDetails(this.selectedItemModal._id).subscribe({
      next:(res)=>{
        this.productDetails=res.data;
        this.curImg=res.data.images[0];
        this.isLoading=false;
        this.fromModal=true;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false;
      }
     })
       this.getLogedUserCart();
     this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishlistSet = new Set<any>(newData);
      }
    }
    )
  }
   changePic(currentImage: HTMLImageElement, changeImage: HTMLImageElement){
     let New:string=changeImage.getAttribute('src')||'';
     let Cur:string=currentImage.getAttribute('src')||'';
     currentImage.setAttribute('src',New);
     changeImage.setAttribute('src',Cur);
     this.curImg=currentImage.getAttribute('src')||'';
   }

   changePic2(currentImage:HTMLImageElement,arr:any){
    const index = +arr.split('-')[1];
      let changeImage=this.productDetails.images[index];;
     let Cur:string=currentImage.getAttribute('src')||'';
     currentImage.setAttribute('src',changeImage);
     changeImage=Cur;
   }


   handleImageHover(event: MouseEvent): void {
    const container = event.currentTarget as HTMLElement;
  const containerRect = container.getBoundingClientRect();

  const offsetX = event.clientX - containerRect.left;
  const offsetY = event.clientY - containerRect.top;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const zoomFactor = 3; // Adjust the zoom level as desired

  const zoomedImageWidth = containerWidth * zoomFactor;
  const zoomedImageHeight = containerHeight * zoomFactor;

  const backgroundPositionX = `${-offsetX * (zoomFactor - 1)}px`;
  const backgroundPositionY = `${-offsetY * (zoomFactor - 1)}px`;

  this.zoomedImageSize = `${zoomedImageWidth}px ${zoomedImageHeight}px`;
  this.zoomedImageUrl = (event.target as HTMLImageElement).src;
  this.zoomedImagePosition = `${backgroundPositionX} ${backgroundPositionY}`;
  this.showZoomedImage = true;
  setTimeout(() => {
    this.zoomedImagePosition = `${backgroundPositionX} ${backgroundPositionY}`;
    this.zoomedImageTransitionClass = 'zoomed-image-transition';
  }, 10);
  }

   handleImageLeave(): void {
    this.showZoomedImage = false;
  }

addToCart(productId:string,element:HTMLButtonElement){
  if(localStorage.getItem('etoken')!==null){
  this._Renderer2.setAttribute(element,'disabled','true');
  this.loadingCart=true;
  this._CartService.addToCart(productId).subscribe({
    next:(res)=>{
      this.loadingCart=false;
      this._ToastrService.success(
        res.message + '<img width=30 src="./assets/cart_891468.png">');
       this._Renderer2.removeAttribute(element,'disabled');
       this._CartService.cartNum.next(res.numOfCartItems);
    },
    error:(err)=>{
      this.loadingCart=false;
      this._ToastrService.error(err.error.message);
      this._Renderer2.removeAttribute(element,'disabled');
    }
  })
}
else{
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

       }
     });

 }


  productsCart:any;
  getLogedUserCart(){
  this._CartService.getCartUser().subscribe({
    next:(res)=>{
     this.productsCart=res.data;
    },
    error:(err)=>console.log(err)
  })
}


async checkProductInCart(productId: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this._CartService.getCartUser().subscribe({
      next: (res) => {
        this.productsCart = res.data;
        if (this.productsCart.products.find((item: any) => item.product._id === productId)) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      error: (err) => {
        reject(err); // You can handle errors as needed
      }
    });
  });
}

async updateProductQuantity(productId:string,element:HTMLButtonElement){

  if(await this.checkProductInCart(productId)){
      this._Renderer2.setAttribute(element,'disabled','true');
      this.loadingUpdate=true;
      const numericValue: number = parseInt(this.selectedValue);
      this._CartService.updateProductQuantity(productId,numericValue).subscribe({
        next:()=>{
          this.loadingUpdate=false;
          this._ToastrService.success(
            'the quantity updated successfully ' + '<img width=30 src="./assets/cart_891468.png">');
           this._Renderer2.removeAttribute(element,'disabled');
          },
        error:(err)=>{
          this.loadingUpdate=false;
          this._ToastrService.error(err.error.message);
          this._Renderer2.removeAttribute(element,'disabled');
        },
    });

    }else{
      this._ToastrService.error(
        'The product is not in your Cart '+ '<img width=30 src="./assets/deleteCartpng.png">');
    }
}

imageIsLoading: boolean = true;

imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 300);
  }
}
