import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
    children:[
    {path:'',redirectTo:'home', pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'cart', canActivate:[authGuard],loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:"Cart"},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:"Products"},
    {path:':com-name/details/:id',loadComponent:()=>import('./components/product-details/product-details.component').then((m)=>m.ProductDetailsComponent),title:"Product Details"},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),title:"Brands"},
    {path:'brand/:id',loadComponent:()=>import('./components/barnd-spec/barnd-spec.component').then((m)=>m.BrandSpecComponent),title:"Brand"},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),title:"Categories"},
    {path:'category/:id',loadComponent:()=>import('./components/cat-spec/cat-spec.component').then((m)=>m.CatSpecComponent),title:"Category"},
    {path:'allorders', canActivate:[authGuard],loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:"All Orders"},
    {path:'payment/:id',loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:"Payment"},
    {path:'cash/:id',loadComponent:()=>import('./components/cash-orders/cash-orders.component').then((m)=>m.CashOrdersComponent),title:"Cash"},
    {path:'wishlist', canActivate:[authGuard],loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent),title:"Wishlist"},
    {path:'search',loadComponent:()=>import('./components/search/search.component').then((m)=>m.SearchComponent),title:"search"},
    {path:'profile', canActivate:[authGuard],loadComponent:()=>import('./components/user-profile/user-profile.component').then((m)=>m.UserProfileComponent),title:"Profile"},
  ]},
  {
    path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
    children:[
      {path:"",redirectTo:'login',pathMatch:"full"},
      {path:"login",loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:"Login"},
      {path:"register",loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:"Register"},
      {path:"forgetpassword",loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent),title:"Forget Password"},
    ]
  },
  {
   path:'dashboard',loadChildren:()=>import('./dashboard-module/dashboard.module').then((m)=>m.DashboardModule),title:'DashBoard'
  },
  {
    path:"**",loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:"404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled",useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
