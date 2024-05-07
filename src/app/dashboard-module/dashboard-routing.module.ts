import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authDashGuard } from '../core/guard/auth-dash.guard';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  {path:'orders',canActivate:[authDashGuard],loadComponent:()=>import('./all-orders/all-orders.component').then((m)=>m.AllOrdersComponent),title:'Orders'},
  {path:'login',loadComponent:()=>import('./login/login.component').then((m)=>m.LoginComponent),title:'Login to Dashboard'},
  {path:'todolist',loadComponent:()=>import('./todo-list/todo-list.component').then((m)=>m.TodoListComponent),title:'ToDo List'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
