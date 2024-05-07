import { Component } from '@angular/core';
import { Size } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
  spinnerSize: Size = 'medium';
 ngOnInit():void{
 if(innerWidth<=768){
    this.spinnerSize='default'
  }
  else if(innerWidth>=992){
    this.spinnerSize='medium'
  }
 }



}
