import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule,OwlOptions  } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../core/services/products.service';
import { Category } from '../../../core/interfaces/category';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule,RouterLink,CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{

  constructor(private _ProductsService:ProductsService){}

  categories:Category[]=[];
 ngOnInit(): void {
   this._ProductsService.getCategories().subscribe({
    next:(res)=>{
          this.categories=res.data;
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
}
