import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Category } from '../../core/interfaces/category';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,NgxSkeletonLoaderModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  isLoading:boolean=false;
  categories:Category[]=[];
  @ViewChildren('test') test!:QueryList<ElementRef>;
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
  this._ProductsService.getCategories().subscribe({
    next:(res)=>{
      this.categories=res.data;
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

imageIsLoading: boolean = true;

  imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 200);
  }
}
