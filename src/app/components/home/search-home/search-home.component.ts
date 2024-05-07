import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProductSharedService } from '../../../core/services/product-shared.service';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.scss'
})
export class SearchHomeComponent implements OnInit{
 Products:Product[]=[];
 searchArr:Product[]=[];
 searchEmpty: boolean = true;
 onInputStatus: boolean = false;
 callApi!: Subscription;
 callApi2!: Subscription;
constructor(
  private _ProductsService:ProductsService,
  private _ProductSharedService:ProductSharedService,
  private _Router:Router
  ){}
mobileSize:boolean=false;
ngOnInit(): void {
  this.callApi = this._ProductsService.getProducts(1).subscribe({
    next:(res)=>{
          this.Products=res.data;
          this.searchEmpty=false;
    },
    error:(err)=>console.log(err),
   });

  this.callApi2 = this._ProductsService.getProducts(2).subscribe({
    next:(res)=>{
          this.Products=this.Products.concat(res.data);
          this.searchEmpty=false;
    },
    error:(err)=>console.log(err),
   });
  this.mobileSize=innerWidth<=768;
}

searchResult(result:string){
  if (this.searchEmpty == false && result!=' '){
      this.searchArr=this.Products.filter(item=>
     item.title?.toLowerCase().includes(result.toLowerCase())||
     item.category?.name?.toLowerCase().includes(result.toLowerCase())
     );
     this.onInputStatus=true;
  }
}

onBlur(searchInput:HTMLInputElement):void{
  if(searchInput.value.length==0){
    this.onInputStatus=false;
  }
  else{
    setTimeout(()=>{
      this.onInputStatus=false;
    },500)
  }
}

onFoucs(){
  this.onInputStatus=true;
}

openSearch(element:HTMLInputElement):void{
  this._ProductSharedService.curPoducts=this.searchArr;
  if(this.searchArr.length>0){
     this._Router.navigate(['/search']);
     this._ProductSharedService.setSearchProducts(this.searchArr,element.value);
     element.value='';
     this.onInputStatus=false;
  }
}

ngOnDestroy(): void {
  this.callApi.unsubscribe();
  this.callApi2.unsubscribe();
}
}
