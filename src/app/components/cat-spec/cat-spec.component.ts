import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Category } from '../../core/interfaces/orders';
import { CarouselModule,OwlOptions  } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductComponent } from '../products/product/product.component';
import { Product } from '../../core/interfaces/product';
import { SelectedCategoryPipe } from '../../core/pipe/selected-category.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-cat-spec',
  standalone: true,
  imports: [CommonModule,ModalComponent,NgxSkeletonLoaderModule,SelectedCategoryPipe,ProductComponent,CarouselModule],
  templateUrl: './cat-spec.component.html',
  styleUrl: './cat-spec.component.scss'
})
export class CatSpecComponent implements OnInit{

 constructor(
   private _ActivatedRoute:ActivatedRoute,
   private _ProductsService:ProductsService,
   private _WishlistService:WishlistService
 ){}

  Category!:Category;
  SubCats!:any;
  isLoading:boolean=true;
  allProducts:Product[]=[];
  wishlistSet: Set<any>= new Set<any>();
 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let idCategory:string|null=params.get('id');
      this._ProductsService.getSpecificCat(idCategory).subscribe({
        next:(res)=>{
          this.isLoading=false;
          this.Category=res.data;
        }
      });
      this._ProductsService.getSubOfSpecficCat(idCategory).subscribe({
        next:(res)=>{
           this.SubCats=res.data;
        }
      })
    }
   });
   this._WishlistService.getUserWishlist().subscribe({
    next:(res)=>{
      const newData=res.data.map((item:any)=>item._id);
      this.wishlistSet = new Set<any>(newData);
    }
  }
  )
  this.getAllProducts();
 }

 getAllProducts():void{
  this._ProductsService.getProducts(1).subscribe({
    next:(res)=>{
      this.allProducts=res.data;
    }
  });
  this._ProductsService.getProducts(2).subscribe({
    next:(res)=>{
      this.allProducts=this.allProducts.concat(res.data);
    }
  })
 }


 imageIsLoading: boolean = true;

 imageLoaded(): void {
   setTimeout(() => {
     this.imageIsLoading = false;
   }, 1000);
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
