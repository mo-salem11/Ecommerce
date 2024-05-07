import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { SearchHomeComponent } from './search-home/search-home.component';
import { RecommedSliderComponent } from './recommed-slider/recommed-slider.component';
import { BrandSliderComponent } from './brand-slider/brand-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,BrandSliderComponent,FormsModule,MainSliderComponent,CategorySliderComponent,SearchHomeComponent,RecommedSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}
