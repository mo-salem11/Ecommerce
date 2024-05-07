import { Brand } from './../../../core/interfaces/brands';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule,OwlOptions  } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@Component({
  selector: 'app-brand-slider',
  standalone: true,
  imports: [CommonModule,NgxSkeletonLoaderModule,RouterLink,CarouselModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.scss'
})
export class BrandSliderComponent implements OnInit{
  constructor(private _ProductsService:ProductsService){}

  brands:Brand[]=[];
 ngOnInit(): void {
   this._ProductsService.getBrands().subscribe({
    next:(res)=>{
          this.brands=res.data;
    },
    error:(err)=>console.log(err),
   })
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


imageIsLoading: boolean = true;

imageLoaded(): void {
  setTimeout(() => {
    this.imageIsLoading = false;
  }, 200);
}
}
