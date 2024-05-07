import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule,OwlOptions  } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports:[CommonModule,CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent  {

  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }


}
