import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
 cardId:string|null='';
 orderForm!: FormGroup;
 phone!: FormControl;
 city!: FormControl;
 details!: FormControl;
 isLoading:boolean=false;
  constructor(
  private _ActivatedRoute:ActivatedRoute,
  private _CartService:CartService

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
    if(this.orderForm.valid){
      this.isLoading=true;
      this._CartService.checkout(this.cardId,this.orderForm.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          this._CartService.cartNum.next(0);
          console.log(res);
          if(res.status==='success'){
             window.open(res.session.url,'_blank')
          }
        },
        error:()=>{
          this.isLoading=false;
        }
       })
    }else{
      this.orderForm.markAllAsTouched();
    }

  }
}

