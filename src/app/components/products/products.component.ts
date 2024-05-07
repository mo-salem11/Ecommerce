import { ProductSharedService } from './../../core/services/product-shared.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ProductComponent } from './product/product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Product } from '../../core/interfaces/product';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { SelectedCategoryPipe } from '../../core/pipe/selected-category.pipe';
import { SelectedBrandPipe } from '../../core/pipe/selected-brand.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { PricePipe } from '../../core/pipe/price.pipe';
import { StarPipe } from '../../core/pipe/rating.pipe';
import { SortingPipe } from '../../core/pipe/sorting.pipe';
import { ModalComponent } from '../modal/modal.component';
import { SearchPipe } from '../../core/pipe/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,SearchPipe,ModalComponent,FormsModule,SortingPipe,StarPipe,PricePipe,FormsModule,MatSliderModule,SelectedBrandPipe,SelectedCategoryPipe,ProductComponent,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService
    ,private _WishlistService:WishlistService
    ,private _ProductSharedService:ProductSharedService
    ,private _Renderer2:Renderer2,){

    }
 products:Product[]=[];
 productsLens:number=0;
 AllProducts:Product[]=[];
 callApi!: Subscription;
 pageSize:number=0;
 currentPage:number=0;
 total:number=0;
 startNumber: number = 0;
 endNumber: number = 10;
 ProductsLength: number = 0;
 wishlistSet: Set<any>= new Set<any>();
 showBtnLoad:boolean=true;
 PageFlag: string = 'first';
 startPaginitionFlag: boolean = true;
 allproductsFromPagenition!: Product[];
 endPage: boolean = true;
 productsLoaded: boolean = true;
 priceRange: number = 43000;
 sortBy:string='a - z';
 inputSearch:string='';
 @ViewChild('stars') allStars!: ElementRef;
 @ViewChild('items') items!:any;

 private observer!: MutationObserver;
displayMoreProducts():void{
  this.endNumber+=10;
  if(this.endNumber>this.ProductsLength){
    this.endNumber=this.ProductsLength;
  }
  if(this.endNumber>=40){
    this.showBtnLoad=false;
  }
  if(this.PageFlag=="first"&&this.endNumber<=40){
     this.getAllProducts2();
  }
 }

 ngAfterViewInit(): void {
  this.observer = new MutationObserver(() => {
    this.productsLens=this.items.nativeElement.childElementCount;
  });
  this.observer.observe(this.items.nativeElement, { childList: true });
}



displayMorePages(res?:Product[]):void{
  if(res){
    this._ProductSharedService.curPoducts=res;
     this.products=res.slice(this.startNumber,this.endNumber);
     this.endNumber+=10;
     if(this.endNumber>res.length){
      this.endNumber=res.length;
     }

  }else if(!res){
    this.products=this._ProductSharedService.curPoducts.slice(0,this.endNumber)
    if(this.endNumber==this._ProductSharedService.curPoducts.length){
      this.endPage=false;
    }
  }


}

getAllProducts2(){
  this.products=this.AllProducts.slice(
    this.startNumber,
    this.endNumber
   );

}


 getInitAllProducts(){
 this.callApi= this._ProductsService.getProducts().subscribe({
    next:(res)=>{
      this.AllProducts=res.data;
      this.ProductsLength=res.data.length;
     this.products=res.data.slice(
      this.startNumber,
      this.endNumber
     )
      this._ProductSharedService.curPoducts=res.data;
      this.productsLoaded = false;
      this.pageSize=res.metadata.limit;
      this.currentPage=res.metadata.currentPage;
      this.total=res.results;
    }
  });
 }

  ngOnInit(): void {
   this.getInitAllProducts();
    this._WishlistService.getUserWishlist().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishlistSet = new Set<any>(newData);
      }
    }
    );
    this._ProductSharedService.lengthProducts.subscribe({
      next:(length)=>{
        this.productsLens=length;
      }
    })
    this.checkWindowWidth();
  }

  checkWindowWidth(){
    this.showToggle = window.innerWidth > 992;
  }

  pageChanged(event:any):void{
    this.endPage=true;
    this.startPaginitionFlag=false;
    this.endNumber=10;
    this.PageFlag='start Pagenetion';
   this.callApi= this._ProductsService.getProducts(event).subscribe({
      next:(res)=>{
        this.products=res.data;
        this.displayMorePages(res.data);

        this._ProductSharedService.curPoducts=res.data;
        this.productsLoaded = false;
        this.pageSize=res.metadata.limit;
        this.currentPage=res.metadata.currentPage;
        this.total=res.results;
      }
    })

}


  ngOnDestroy(): void {
    this.callApi.unsubscribe();
    this.observer.disconnect();
  }


  imageIsLoading: boolean = true;

  imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 1000);
  }

  showToggle:boolean=false;
  toggle(){
    this.showToggle=!this.showToggle;
  }


 showBrand:boolean=false;
  toggleBrand(event:Event){
   this.showBrand=!this.showBrand;
   event.stopPropagation();
  }
  showCat:boolean=true;
  toggleCat(event:Event){
   this.showCat=!this.showCat;
   event.stopPropagation();
  }
  showSubCatWoman:boolean=false;
  toggleSubCatWoman(event:Event){
   this.showSubCatWoman=!this.showSubCatWoman;
   event.stopPropagation();
  }
  showtoggleSubCatMen:boolean=false;
  toggleSubCatmen(event:Event){
    this.showtoggleSubCatMen=!this.showtoggleSubCatMen;
    event.stopPropagation();
  }



  showtoggleSubCatElec:boolean=false;
  toggleSubCatElec(event:Event){
    this.showtoggleSubCatElec=!this.showtoggleSubCatElec;
    event.stopPropagation();
  }

  selectedCategoryName: string = 'all categories';
  filterCategoriy(element:any,event:Event){
    this.selectedCategoryName=element.innerHTML.toLowerCase();
    event.stopPropagation();
  }
  selectedBrandName: string = 'all brands';
  filterBrand(element:any,event:Event){
    this.selectedBrandName=element.innerHTML.toLowerCase();
    if(this.selectedBrandName.includes('&amp;')){
      this.selectedBrandName=this.selectedBrandName.replace(/&amp;/g, "&");
    }
    event.stopPropagation();
  }

  showTogglePrice:boolean=true;
  togglePrice():void{
    this.showTogglePrice=!this.showTogglePrice;
  }

  showtoggleRate:boolean=true;
  toggleRate():void{
   this.showtoggleRate=!this.showtoggleRate;
  }

selectedratingNum:number=5;
  onStarClick(num:number){
     this.selectedratingNum=num;
    let AllStars=this.allStars.nativeElement.querySelectorAll('i');
     AllStars.forEach((star: HTMLElement, index: number) => {
      this._Renderer2.addClass(star, 'fa-regular');
      this._Renderer2.removeClass(star, 'fa-solid');
      if (num >= index + 1) {
        this._Renderer2.addClass(star, 'fa-solid');
        this._Renderer2.removeClass(star, 'fa-regular');
      }
    });
  }

 selectedModalItem!:Product;
 openModal(event:Product){
   this.selectedModalItem=event;
 }


}
