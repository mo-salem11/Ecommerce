import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyHttpInterceptor } from './core/intercepters/my-http.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './core/intercepters/loading.interceptor';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
     { enableHtml: true,
      timeOut: 1700,
      positionClass: 'toast-top-right',
      progressBar:true,
      toastClass:'mt-5 ngx-toastr',
    }
    ),
    NgxSpinnerModule,
  ],
  providers: [
   {
    provide:HTTP_INTERCEPTORS,
    useClass:MyHttpInterceptor,
    multi:true
  },
   {
    provide:HTTP_INTERCEPTORS,
    useClass:LoadingInterceptor,
    multi:true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
