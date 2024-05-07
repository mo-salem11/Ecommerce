import { CommonModule } from '@angular/common';
import { Component , ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,ProductDetailsComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent{

  @ViewChild('modal')Modal!:ElementRef;
  @Input() item: any;
  selectedItem: any;
  isLoading:boolean=true;
 constructor(
 ){}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue) {
      this.selectedItem = changes['item'].currentValue;
      this.isLoading=false;
      setTimeout(()=>{
        this.Modal.nativeElement.classList.remove('d-none');
      },1000)
}

}
stopModalPro(event:MouseEvent){
 event.stopPropagation();
}
toggleModal(event:HTMLDivElement){
  event.classList.add('d-none')
}
}
