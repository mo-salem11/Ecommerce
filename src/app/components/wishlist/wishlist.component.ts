import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductComponent } from '../products/product/product.component';
import gsap from 'gsap';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,ModalComponent,ProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, AfterContentInit {
 constructor(private _WishlistService :WishlistService,
   ){}
 products:Product[]=[];
filterProductId:string='';
fixUrlImgWishlist:boolean=true;

@ViewChildren('test') test!:QueryList<ElementRef>;


ngOnInit(): void {
  this._WishlistService.getUserWishlist().subscribe({
    next:(res)=>{
      this.products=res.data;
    }
  }
  )
}


filterProducts(Id:string){
  this.filterProductId=Id;
  this.products=this.products.filter((item)=>item._id!=Id);
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

selectedModalItem!:Product;
openModal(event:Product){
  this.selectedModalItem=event;
}
}
