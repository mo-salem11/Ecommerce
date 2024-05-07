import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cash-orders',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cash-orders.component.html',
  styleUrl: './cash-orders.component.scss'
})
export class CashOrdersComponent {
  cardId:string|null='';
 orderForm!: FormGroup;
 phone!: FormControl;
 city!: FormControl;
 details!: FormControl;
 isLoading:boolean=false;
  constructor(
  private _ActivatedRoute:ActivatedRoute,
  private _CartService:CartService,
  private _Router:Router

 ){}


 ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.cardId=params.get('id');
    }
  })
  this.initFormControl();
  this.initFormGroup();
}

initFormControl(): void {
  this.details=new FormControl('',[Validators.required,Validators.minLength(10),]);
  this.city=new FormControl('',[Validators.required, Validators.minLength(3),]);
  this.phone=new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]);
}
initFormGroup():void{
  this.orderForm=new FormGroup({
    details:this.details,
    phone:this.phone,
    city:this.city,

    })
}
handleFrom():void{
  this.isLoading=true;
 this._CartService.cashOrders(this.cardId,this.orderForm.value).subscribe({
  next:(res)=>{
    this._CartService.cartNum.next(0);
    this._Router.navigate(['/allorders']);
    this.isLoading=false;

  },
  error:(err)=>{
    console.log(err);
    this.isLoading=false;
  }
 })
}
}
