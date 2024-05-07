import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/services/products.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ProductComponent } from '../../products/product/product.component';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-recommed-slider',
  standalone: true,
  imports: [CommonModule,ModalComponent,CarouselModule,ProductComponent],
  templateUrl: './recommed-slider.component.html',
  styleUrl: './recommed-slider.component.scss'
})
export class RecommedSliderComponent implements OnInit{
  Products:Product[]=[];
  wishlistSet: Set<any>= new Set<any>();
  constructor(private _ProductsService:ProductsService,private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(res)=>{
            this.Products=res.data;
      },
      error:(err)=>console.log(err),
     });
     this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishlistSet = new Set<any>(newData);
      }
    }
    )
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  selectedModalItem!:Product;
  openModal(event:Product){
    this.selectedModalItem=event;
  }
}
