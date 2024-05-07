import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';
import { CartService } from '../../core/services/cart.service';
import { Orders } from '../../core/interfaces/orders';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import gsap from 'gsap';
@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxSkeletonLoaderModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  userId:any;
  isLoading:boolean=true;
  userOrders:Orders[]=[];
  currentOrder!:Orders;
  @ViewChildren('test') test!:QueryList<ElementRef>;
 constructor(
  private _AuthService:AuthService,
  private _CartService:CartService){}

 ngOnInit(): void {
  const user=this._AuthService.decodeUser();
  this.userId=user.id;
 this._CartService.getAllOrders(this.userId).subscribe({
  next:(res)=>{
    this.userOrders=res as Orders[];
    this.isLoading=false;
    this.currentOrder=this.userOrders[this.userOrders.length-1];
    this._CartService.OrdersNum.next(this.userOrders.length);
  }
 })

 }
 changeCurOrder(order:Orders){
   this.currentOrder=order;
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

 imageLoading:boolean=true;
 isImageLoading():void{
  setTimeout(()=>{
    this.imageLoading=false;
  },1500);
 }
}
