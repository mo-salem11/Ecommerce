import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Brand } from '../../core/interfaces/orders';
import {NgxPaginationModule} from 'ngx-pagination';
import gsap from 'gsap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,NgxSkeletonLoaderModule,RouterLink,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  brands:Brand[]=[];
  isLoading:boolean=false;
  pageSize:number=0;
  currentPage:number=0;
  total:number=0;
  @ViewChildren('test') test!:QueryList<ElementRef>;
  constructor(private _ProductsService:ProductsService){}
 ngOnInit(): void {
  this.isLoading=true;
  this._ProductsService.getBrands().subscribe({
    next:(res)=>{
      this.brands=res.data;
      this.isLoading=false;
    }
   })
 }

 ngAfterContentInit(): void {
  setTimeout(()=>{
    this.test.forEach((starElement) => {
      gsap.to(starElement.nativeElement, {
        repeat: -1,
        rotate: 360,
        yoyo: true,
        duration:3
      });
    });
  },2500)
}
 pageChanged(event:any):void{
  this.isLoading=true;
  this._ProductsService.getBrands(event).subscribe({
    next:(res)=>{
      this.brands=res.data;
      this.isLoading = false;
      this.pageSize=res.metadata.limit;
      this.currentPage=res.metadata.currentPage;
      this.total=res.results;
    }
  })

}

imageIsLoading: boolean = true;

  imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 1000);
  }
}
