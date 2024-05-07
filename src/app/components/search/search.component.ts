import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductSharedService } from '../../core/services/product-shared.service';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../products/product/product.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { PricePipe } from '../../core/pipe/price.pipe';
import { StarPipe } from '../../core/pipe/rating.pipe';
import { SelectedCategoryPipe } from '../../core/pipe/selected-category.pipe';
import { SelectedBrandPipe } from '../../core/pipe/selected-brand.pipe';
import { SortingPipe } from '../../core/pipe/sorting.pipe';
import { ModalComponent } from '../modal/modal.component';
import { SearchPipe } from '../../core/pipe/search.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,SearchPipe,ModalComponent,FormsModule,SortingPipe,PricePipe,SelectedBrandPipe,StarPipe,SelectedCategoryPipe,FormsModule,MatSliderModule,ProductComponent,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  priceRange: number = 43000;
  @ViewChild('stars') allStars!: ElementRef;
  @ViewChild('items') items!:any;

  homeSearchProducts:Product[]=[];
  nameSearch:string='';
  inputSearch:string='';
  lenProducts:number=0;
  sortBy:string='a - z';
  private opserver!:MutationObserver;
  constructor(
    private _ProductSharedService:ProductSharedService,
    private _Renderer2:Renderer2
  ){
  }

  ngOnInit(): void {
    this._ProductSharedService.sharedResult.subscribe((products)=>{
    this.homeSearchProducts=products;
    this.lenProducts=products.length;
    });
    this.nameSearch=this._ProductSharedService.searchName;
    this.checkWindowWidth();
  }
  checkWindowWidth(){
    this.showToggle = window.innerWidth > 992;
  }
  ngAfterViewInit(): void {

    this.opserver=new MutationObserver(()=>{
      this.lenProducts=this.items.nativeElement.childElementCount;
    })
    this.opserver.observe(this.items.nativeElement,{childList: true })
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
     this._Renderer2.removeClass(star, 'rating-color');
     if (num >= index + 1) {
       this._Renderer2.addClass(star, 'rating-color');
     }
   });
 }

 selectedModalItem!:Product;
 openModal(event:Product){
   this.selectedModalItem=event;
 }
}
