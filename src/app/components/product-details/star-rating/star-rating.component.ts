import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() apiRating: number=0;
  stars: number = 0;
  hasHalfStar: boolean = false;
  starsArray: number[] = [];
   remainder:number=0;
   EmptyStar:number[]=[];
  ngOnChanges(changes: SimpleChange): void {
    const ratingNumber = this.apiRating;
    const numStars = Math.floor(ratingNumber);
     this.remainder = ratingNumber % 1;

    this.starsArray = Array.from({ length: numStars }, (_, index) => index + 1);
   this.EmptyStar=Array.from({length:this.remainder<.25?5-numStars:5-(numStars+1)}) ;
    if (this.remainder >= 0.25 && this.remainder <= 0.75) {
      this.hasHalfStar = true;
    } else {
      this.hasHalfStar = false;
    }
  }
}
