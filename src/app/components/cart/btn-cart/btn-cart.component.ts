import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-btn-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-cart.component.html',
  styleUrl: './btn-cart.component.scss'
})
export class BtnCartComponent {
  @Input() isLoading: boolean = false;
  @Input() text:string = '';
  @Input() icon:string = '';


}
